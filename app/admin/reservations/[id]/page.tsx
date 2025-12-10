

export default async function ReservationDetailPage({ params }) {
  const { id } = params;

  if (!id) return notFound();

  // ★ Host ヘッダーを取得
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  // ★ 絶対 URL を構築
  const url = `${protocol}://${host}/api/reservations?id=${id}`;

  // ★ fetch
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
