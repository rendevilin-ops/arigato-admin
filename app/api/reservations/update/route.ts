import { NextResponse } from "next/server";

export const runtime = "nodejs";

const N8N_UPDATE_WEBHOOK =
  "https://n8n-arigato.workflows.dev/webhook/reservation-update";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("DEBUG: Received update request:", body);

    const n8nRes = await fetch(N8N_UPDATE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("DEBUG: n8n response status:", n8nRes.status);

    return NextResponse.json({ status: "Updated!", n8nStatus: n8nRes.status });

  } catch (err: any) {
    console.error("DEBUG: Update error:", err);

    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
