import { notFound } from "next/navigation";

export default async function ReservationDetailPage({ params }) {
  const { id } = params;

  // 絶対URLを生成（相対URLを避ける）
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const url = `${baseUrl}/api/reservations?id=${id}`;

  let data = null;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("FETCH ERROR STATUS:", res.status);
      return notFound();
    }

    const text = await res.text();
    console.log("RAW TEXT:", text);

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
