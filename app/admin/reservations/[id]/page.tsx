import { notFound } from "next/navigation";
import { headers } from "next/headers";

function getBaseUrl() {
  const h = headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto") || "https";
  return `${protocol}://${host}`;
}

export default async function ReservationDetailPage({ params }) {
  const { id } = params;

  if (!id) return notFound();

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/reservations?id=${id}`;

  let data = null;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("FETCH ERROR STATUS:", res.status);
      return notFound();
    }

    const text = await res.text();

    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("JSON PARSE ERROR:", err);
      return notFound();
    }
  } catch (err) {
    console.error("FETCH FAILED:", err);
    return notFound();
  }

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
