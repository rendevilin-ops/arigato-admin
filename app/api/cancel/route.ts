import { kv } from "@vercel/kv";

interface Reservation {
  ReservationID: string;
  Date: string;
  ArrivalTime: string;
  Service: string;
  Pax?: number;
  Email?: string;
  status?: string;
}

interface KVReservationData {
  reservation: Reservation[];
}

interface AvailabilityItem {
  Date: string;
  Service: string;
  Reserved: number;
  Availability: number;
}

interface KVAvailabilityData {
  availability: AvailabilityItem[];
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { error: "Reservation ID required" },
        { status: 400 }
      );
    }

    // ===============================
    // ① 予約取得
    // ===============================
    const reservationData = (await kv.get(
      "reservation"
    )) as KVReservationData | null;

    if (!reservationData) {
      return Response.json(
        { error: "No reservations found" },
        { status: 404 }
      );
    }

    let canceledReservation: Reservation | null = null;

    const updatedReservations = reservationData.reservation.map((r) => {
      if (r.ReservationID === id) {

        // 二重キャンセル防止
        if (r.status === "canceled") {
          throw new Error("Already canceled");
        }

        canceledReservation = { ...r, status: "canceled" };
        return canceledReservation;
      }
      return r;
    });

    if (!canceledReservation) {
      return Response.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    // ② 予約データ更新
    await kv.set("reservation", {
      reservation: updatedReservations,
    });

    // ===============================
    // ③ 空席を戻す
    // ===============================
    const availabilityData = (await kv.get(
      "arigato-availability"
    )) as KVAvailabilityData | null;

    if (availabilityData && canceledReservation.Pax) {
      const updatedAvailability = availabilityData.availability.map((a) => {
        if (
          a.Date === canceledReservation!.Date &&
          a.Service === canceledReservation!.Service
        ) {
          return {
            ...a,
            Reserved: Math.max(
              0,
              a.Reserved - (canceledReservation!.Pax || 0)
            ),
            Availability:
              a.Availability + (canceledReservation!.Pax || 0),
          };
        }
        return a;
      });

      await kv.set("arigato-availability", {
        availability: updatedAvailability,
      });
    }

    // ===============================
    // ④ n8n 通知（失敗してもOK）
    // ===============================
    if (process.env.N8N_ENDPOINT) {
      fetch(process.env.N8N_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cancel",
          ReservationID: canceledReservation.ReservationID,
          Date: canceledReservation.Date,
          ArrivalTime: canceledReservation.ArrivalTime,
          Service: canceledReservation.Service,
          Pax: canceledReservation.Pax,
          Email: canceledReservation.Email,
        }),
      }).catch((err) =>
        console.error("n8n cancel notify error:", err)
      );
    }

    return Response.json({ success: true });
  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
