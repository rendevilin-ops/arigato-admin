"use client";

import { useEffect, useState } from "react";

export default function ReservationDetailPage({ params }) {
  const { id } = params;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/reservations?id=${id}`, {
        cache: "no-store",
      });

      const json = await res.json();
      setData(json);
    } catch (e) {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!data)
    return <div className="p-6 text-red-600">Reservation not found.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reservation Detail</h1>

      <pre className="bg-gray-100 p-4 rounded text-sm">
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
