import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "ID required" }, { status: 400 });
    }

    const data = await kv.get("reservation");

    if (!data || !data.reservation) {
      return Response.json({ error: "No reservations" }, { status: 404 });
    }

    let found = false;

    const updated = data.reservation.map((r: any) => {
      if (r.ReservationID === id) {
        if (r.status === "canceled") {
          throw new Error("Already canceled");
        }
        found = true;
        return { ...r, status: "canceled" };
      }
      return r;
    });

    if (!found) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    await kv.set("reservation", { reservation: updated });

    return Response.json({ success: true });

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
