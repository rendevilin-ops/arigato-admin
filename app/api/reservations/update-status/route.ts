import { NextResponse } from "next/server";

export const runtime = "nodejs";

const N8N_STATUS_WEBHOOK =
  "https://n8n-sab.onrender.com/webhook/status-update";

export async function POST(req: Request) {
  try {
    console.log("STATUS UPDATE API: Received request");

    const body = await req.json();
    console.log("STATUS UPDATE API: Body =", body);

    // n8n に転送
    const result = await fetch(N8N_STATUS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("STATUS UPDATE API: n8n response", result.status);

    return NextResponse.json({
      ok: true,
      n8nStatus: result.status,
    });

  } catch (err: any) {
    console.error("STATUS UPDATE API ERROR:", err);
    return NextResponse.json(
      {
        error: err.message || "Unknown error",
        stack: err.stack || "",
      },
      { status: 500 }
    );
  }
}
