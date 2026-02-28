// app/api/reservations/get/route.ts

import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ReservationID is required" },
        { status: 400 }
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
        { status: 404 }
      );
    }

    return NextResponse.json({ reservation });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
