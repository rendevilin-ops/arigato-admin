import { NextResponse } from "next/server";

const N8N_ENDPOINT = process.env.N8N_ENDPOINT;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateFilter = searchParams.get("date");
    const idFilter = searchParams.get("id");

    if (!N8N_ENDPOINT) {
      return NextResponse.json(
        { error: "N8N_ENDPOINT not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(N8N_ENDPOINT, { cache: "no-store" });
    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON from n8n", raw: text },
        { status: 500 }
      );
    }

    // ★ rows は必ず json[0].rows
    const rows = json?.[0]?.rows || [];

    // ★ id が指定された場合 → 予約1件を返す
    if (idFilter) {
      const item = rows.find((r) => r.ReservationID === idFilter);
      return NextResponse.json(item || null, { status: 200 });
    }

    // ★ 日付フィルタ
    let filtered = rows;
    if (dateFilter) {
      filtered = filtered.filter((r) => r.Date === dateFilter);
    }

    // ★ 時間順でソート
    filtered.sort((a, b) =>
      (a.ArrivalTime || "").localeCompare(b.ArrivalTime || "")
    );

    return NextResponse.json(filtered, { status: 200 });

  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
