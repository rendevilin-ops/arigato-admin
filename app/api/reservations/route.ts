import { NextResponse } from "next/server";

const N8N_ENDPOINT = process.env.N8N_ENDPOINT; // .env.local に書く

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateFilter = searchParams.get("date"); // YYYY-MM-DD

    if (!N8N_ENDPOINT) {
      return NextResponse.json(
        { error: "N8N_ENDPOINT is not configured" },
        { status: 500 }
      );
    }

    // n8n のワークフローにリクエスト
    const res = await fetch(N8N_ENDPOINT, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from n8n" },
        { status: 500 }
      );
    }

    const data = await res.json(); // ← rows が配列で返ってくる

    let rows = data;

    // 日付フィルターが指定されていれば絞る
    if (dateFilter) {
      rows = rows.filter((r: any) => r.Date === dateFilter);
    }

    // 時間でソート（ArrivalTime は "21:00" の形式）
    rows.sort((a: any, b: any) => {
      return a.ArrivalTime.localeCompare(b.ArrivalTime);
    });

    return NextResponse.json(rows, { status: 200 });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
