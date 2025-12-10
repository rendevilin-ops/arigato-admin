import { notFound } from "next/navigation";

export default async function ReservationDetailPage({ params }) {
  const { id } = params;

  if (!id) return notFound();

  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const url = `${base}/api/reservations/?id=${id}`;

  console.log("FETCHING:", url);

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return notFound();

  const data = await res.json();

  if (!data) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservation Detail</h1>

      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>

      <a
        href="/admin/reservations"
        className="inline-block mt-6 text-blue-600 underline"
      >
        ← Back to list
      </a>
    </div>
  );
}
