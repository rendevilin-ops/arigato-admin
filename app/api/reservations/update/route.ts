import { NextResponse } from "next/server";

const GAS_UPDATE_URL =
  "https://script.google.com/macros/s/AKfycbyQxacc3ysNrTjk8HIEF32IdiG7WcwVFE-YqW3nQEr-BWfVBx-qAVq5lEEi8VAkmlkP/exec";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // GAS にそのまま渡す
    const res = await fetch(GAS_UPDATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    return NextResponse.json(json);

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
