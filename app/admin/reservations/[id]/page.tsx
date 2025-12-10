import { notFound } from "next/navigation";

export default async function ReservationDetailPage({ params }) {
  const { id } = params;

  if (!id) return notFound();

  // ★ 相対パスでOK（絶対パス禁止）
  const res = await fetch(`/api/reservations?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const data = await res.json();

  // null だった場合のみ notFound
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
