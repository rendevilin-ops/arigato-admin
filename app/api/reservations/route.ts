import { NextResponse } from "next/server";
import kv from "@/lib/kv";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateFilter = searchParams.get("date");
    const idFilter = searchParams.get("id");

    // ★ Redis から JSON を取得
    const data = await kv.get("reservation");

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    // data = { reservation: […] } の想定
    const rows = data.reservation ?? [];

    // ID フィルタ
    if (idFilter) {
      const item = rows.find((r: any) => r.ReservationID === idFilter);
      return NextResponse.json(item || null);
    }

    // 日付でフィルタ
    let filtered = rows;
    if (dateFilter) {
      filtered = filtered.filter((r: any) => r.date === dateFilter);
    }

    // ArrivalTime 順にソート
    filtered.sort((a: any, b: any) =>
      (a.ArrivalTime || "").localeCompare(b.ArrivalTime || "")
    );

    return NextResponse.json(filtered);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
