import { notFound } from "next/navigation";

export default async function ReservationDetailPage({ params }) {
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations?id=${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!data) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Reservation Detail
      </h1>

      <div className="rounded-lg border p-4 bg-white shadow">
        <p><strong>Name:</strong> {data.FirstName} {data.LastName}</p>
        <p><strong>Date:</strong> {data.Date}</p>
        <p><strong>Time:</strong> {data.ArrivalTime}</p>
        <p><strong>Service:</strong> {data.Service}</p>
        <p><strong>Pax:</strong> {data.Pax}</p>
        <p><strong>Kids:</strong> {data.KidsCount}</p>
        <p><strong>Veg:</strong> {data.VegCount}</p>
        <p><strong>Status:</strong> {data.Status}</p>
        <p><strong>Email:</strong> {data.Email}</p>
        <p><strong>Phone:</strong> {data.Phone}</p>

        <p className="mt-4">
          <strong>Comment:</strong> {data.Comment || "(none)"}
        </p>

        <p className="mt-2 text-xs text-gray-500">
          Created: {data.Timestamp}
        </p>
        <p className="text-xs text-gray-500">
          Updated: {data.UpdatedAt}
        </p>
      </div>

      <a
        href="/admin/reservations"
        className="inline-block mt-6 text-blue-600 underline"
      >
        ← Back to list
      </a>
    </div>
  );
}
