import { kv } from "@vercel/kv";

interface Reservation {
  ReservationID: string;
  Date: string;
  ArrivalTime: string;
  Service: string;
  [key: string]: any;
}

interface KVReservationData {
  reservation: Reservation[];
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateFilter = searchParams.get("date");
    const idFilter = searchParams.get("id");

    // KV からデータ取得（※ 型を指定）
    const data = (await kv.get("reservation")) as KVReservationData | null;

    // data = { reservation: [...] } を想定
    const rows = data?.reservation ?? [];

    // ID フィルタ
    if (idFilter) {
      const item = rows.find((r) => r.ReservationID === idFilter);
      return Response.json(item ?? null);
    }

    // 日付フィルタ
    let filtered = rows;
    if (dateFilter) {
      filtered = filtered.filter((r) => r.date === dateFilter);
    }

    // ソート
    filtered.sort((a, b) =>
      (a.ArrivalTime || "").localeCompare(b.ArrivalTime || "")
    );

    return Response.json(filtered);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
