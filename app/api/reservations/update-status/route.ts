import { kv } from "@vercel/kv";

interface Reservation {
  ReservationID: string;
  Date: string;
  ArrivalTime: string;
  service: string;
  Status: string;
  [key: string]: any;
}

interface KVReservationData {
  reservation: Reservation[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 渡されるデータ：
    // { ReservationID: "...", Status: "confirmed" }
    const { ReservationID, Status } = body;

    if (!ReservationID || !Status) {
      return Response.json(
        { error: "ReservationID and Status are required" },
        { status: 400 }
      );
    }

    // KV 取得
    const data = (await kv.get("reservation")) as KVReservationData | null;

    if (!data?.reservation) {
      return Response.json({ error: "No reservation data found" }, { status: 404 });
    }

    // 全データ
    const rows = data.reservation;

    // 対象を検索
    const idx = rows.findIndex((r) => r.ReservationID === ReservationID);
    if (idx === -1) {
      return Response.json({ error: "Reservation not found" }, { status: 404 });
    }

    // 対象データを更新
    const updatedReservation = {
      ...rows[idx],
      Status,
      UpdatedAt: new Date().toISOString(),
    };

    rows[idx] = updatedReservation;

    // KV に保存し直す
    await kv.set("reservation", { reservation: rows });

    // n8n 用に返したい場合はここで返せる
    return Response.json({
      message: "Status updated",
      reservation: updatedReservation,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
