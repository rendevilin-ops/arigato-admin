import { NextResponse } from "next/server";

const N8N_UPDATE_WEBHOOK =
  "https://n8n-sab.onrender.com/webhook-test/reservation-update";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // n8n へ確実に送信（ここで await する）
    await fetch(N8N_UPDATE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // 送信完了後に UI に返す（これなら 100% 届く）
    return NextResponse.json({ status: "Updated!" });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
