import { NextResponse } from "next/server";

export const runtime = "nodejs";

const N8N_STATUS_WEBHOOK =
  "https://n8n-sab.onrender.com/webhook/status-update";

export async function POST(req: Request) {
  try {
    console.log("STATUS UPDATE API: Received request");

    const origin = req.headers.get("origin") || "";

    const body = await req.json();
    console.log("STATUS UPDATE API: Body =", body);

    const result = await fetch(N8N_STATUS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("STATUS UPDATE API: n8n response", result.status);

    return NextResponse.json(
      {
        ok: true,
        n8nStatus: result.status,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );

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

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin") || "";

  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
