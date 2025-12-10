"use client";

import { useEffect, useState } from "react";

export default function ReservationDetailPage({ params }) {
  const { id } = params;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/reservations?id=${id}`);
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function saveChanges() {
    setSaving(true);

    // n8n 用の新仕様 payload
    const payload = {
      type: "reservation_update",
      reservation: { ...data }
    };

    const res = await fetch(`/api/reservations/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    alert(json.status || "Updated!");
    setSaving(false);
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">Not Found</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reservation Detail</h1>

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            value={data.FirstName}
            onChange={(e) => setData({ ...data, FirstName: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            value={data.LastName}
            onChange={(e) => setData({ ...data, LastName: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Arrival Time</label>
          <input
            value={data.ArrivalTime}
            onChange={(e) => setData({ ...data, ArrivalTime: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Pax</label>
          <input
            type="number"
            value={data.Pax}
            onChange={(e) => setData({ ...data, Pax: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Admin Note</label>
          <textarea
            value={data.AdminNote || ""}
            onChange={(e) => setData({ ...data, AdminNote: e.target.value })}
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>

        <button
          onClick={saveChanges}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <a href="/admin/reservations" className="inline-block mt-6 text-blue-600 underline">
        ← Back to list
      </a>
    </div>
  );
}
