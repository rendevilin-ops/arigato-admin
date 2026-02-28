// app/api/cancel/route.ts
import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { success: false, error: "ID required" },
        { status: 400 }
      );
    }

    // --------------------------
    // 1️⃣ 予約取得
    // --------------------------
    const data: any = await kv.get("reservation");
    const rows = data?.reservation ?? [];

    let found = false;
    let alreadyCanceled = false;
    let canceledBooking: any = null;

    const updated = rows.map((r: any) => {
      if (r.ReservationID === id) {
        found = true;

        if (r.status === "canceled") {
          alreadyCanceled = true;
          return r;
        }

        canceledBooking = r;

        return { ...r, status: "canceled" };
      }
      return r;
    });

    if (!found) {
      return Response.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    if (alreadyCanceled) {
      return Response.json(
        { success: false, error: "Already canceled" },
        { status: 400 }
      );
    }

    // --------------------------
    // 2️⃣ Availability戻し
    // --------------------------
    if (canceledBooking) {
      const { date, service, pax } = canceledBooking;

      const availability: any = await kv.get("availability");

      if (availability?.[date]?.[service] !== undefined) {
        availability[date][service] += Number(pax);
        await kv.set("availability", availability);
      }
    }

    // --------------------------
    // 3️⃣ 予約保存
    // --------------------------
    await kv.set("reservation", { reservation: updated });

    return Response.json({ success: true });

  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
