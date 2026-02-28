import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const origin = req.headers.get("origin") || "";

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ReservationID is required" },
        {
          status: 400,
          headers: { "Access-Control-Allow-Origin": origin }
        }
      );
    }

    const data: any = await kv.get("reservation");
    const rows = data?.reservation ?? [];

    const reservation = rows.find(
      (r: any) => r.ReservationID === id
    );

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        {
          status: 404,
          headers: { "Access-Control-Allow-Origin": origin }
        }
      );
    }

    return NextResponse.json(
      { reservation },
      {
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
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
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
