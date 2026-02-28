import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({
    ok: true,
    message: "Availability API placeholder"
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Availability API placeholder (GET)"
  });
}
