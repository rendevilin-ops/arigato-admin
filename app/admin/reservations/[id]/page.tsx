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

    const payload = {
      type: "reservation_update",
      reservation: {
        ...data,
        UpdateAt: new Date().toISOString()
      },
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

      <div className="space-y-4">

        {/* Date */}
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium">Service</label>
          <select
            value={data.service}
            onChange={(e) => setData({ ...data, service: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        {/* ArrivalTime */}
        <div>
          <label className="block text-sm font-medium">Arrival Time</label>
        <input
          type="time"
          step="900"  // ← 15分刻み
          value={data.ArrivalTime}
          onChange={(e) => setData({ ...data, ArrivalTime: e.target.value })}
          className="border p-2 rounded w-full"
        />
          
        </div>

        {/* First / Last Name */}
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            value={data.LastName}
            onChange={(e) => setData({ ...data, LastName: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            value={data.FirstName}
            onChange={(e) => setData({ ...data, FirstName: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Pax */}
        <div>
          <label className="block text-sm font-medium">Pax</label>
          <input
            type="number"
            value={data.Pax}
            onChange={(e) => setData({ ...data, Pax: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* KidsCount */}
        <div>
          <label className="block text-sm font-medium">Kids Count</label>
          <input
            type="number"
            value={data.KidsCount}
            onChange={(e) => setData({ ...data, KidsCount: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* VegCount */}
        <div>
          <label className="block text-sm font-medium">Veg Count</label>
          <input
            type="number"
            value={data.VegCount}
            onChange={(e) => setData({ ...data, VegCount: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Celebration */}
        <div>
          <label className="block text-sm font-medium">Celebration</label>
          <select
            value={data.Celebration}
            onChange={(e) => setData({ ...data, Celebration: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="FALSE">No</option>
            <option value="TRUE">Yes</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea
            value={data.Comment || ""}
            onChange={(e) => setData({ ...data, Comment: e.target.value })}
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={data.Status}
            onChange={(e) => setData({ ...data, Status: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Save Button */}
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
