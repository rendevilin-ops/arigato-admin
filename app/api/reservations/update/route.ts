import { NextResponse } from "next/server";

export const runtime = "nodejs";

const N8N_UPDATE_WEBHOOK =
  "https://n8n-sab.onrender.com/webhook/reservation-update";

export async function POST(req: Request) {
  try {
    console.log("UPDATE API: Received request");

    const body = await req.json();
    console.log("UPDATE API: Body =", body);

    const result = await fetch(N8N_UPDATE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("UPDATE API: n8n response", result.status);

    return NextResponse.json({ ok: true, n8nStatus: result.status });

  } catch (err: any) {
    console.error("UPDATE API ERROR:", err);
    return NextResponse.json(
      {
        error: err.message || "Unknown error",
        stack: err.stack || "",
      },
      { status: 500 }
    );
  }
}

