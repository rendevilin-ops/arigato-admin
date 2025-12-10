import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Customers API placeholder"
  });
}

export async function POST(req: Request) {
  return NextResponse.json({
    ok: true,
    message: "Customers POST placeholder"
  });
}
