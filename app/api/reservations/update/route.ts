import { NextResponse } from "next/server";

const N8N_UPDATE_WEBHOOK =
  "https://n8n-arigato.workflows.dev/webhook/reservation-update";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // すぐ UI に返す（高速レスキュー）
    const response = NextResponse.json({ status: "Update queued" });

    // ===== 非同期処理（待たずに実行） =====
    fetch(N8N_UPDATE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch((err) => console.error("N8N update error:", err));

    return response;

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
