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

    // n8n へリクエスト
    const res = await fetch(N8N_ENDPOINT, { cache: "no-store" });
    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch (_) {
      return NextResponse.json({ error: "Invalid JSON", raw: text });
    }

    // ★ n8n は rows ではなく、配列そのものを返している
    let rows = json;

    if (!Array.isArray(rows)) {
      return NextResponse.json({ error: "Response is not an array", raw: json });
    }

    // ★ IDフィルタ（detailページ用）
    if (idFilter) {
      const item = rows.find(r => r.ReservationID === idFilter);
      return NextResponse.json(item || null);
    }

    // 日付フィルタ
    if (dateFilter) {
      rows = rows.filter(r => r.Date === dateFilter);
    }

    // 時間順ソート
    rows.sort((a, b) =>
      (a.ArrivalTime || "").localeCompare(b.ArrivalTime || "")
    );

    return NextResponse.json(rows);

  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
