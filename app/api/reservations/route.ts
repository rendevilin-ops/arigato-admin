import { NextResponse } from "next/server";

const N8N_ENDPOINT = process.env.N8N_ENDPOINT;

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

    // n8n から JSON 取得
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

    const data = await res.json();

    // n8n は { rows: [...] } を返す前提
    let rows = data.rows || [];

    // --- 日付でフィルタ (キー名は後で調整してOK) ---
    if (dateFilter) {
      rows = rows.filter((r: any) => r.date === dateFilter);
    }

    // --- 時間ソート (arrivalTime) ---
    rows.sort((a: any, b: any) => {
      return (a.arrivalTime || "").localeCompare(b.arrivalTime || "");
    });

    return NextResponse.json(rows, { status: 200 });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
