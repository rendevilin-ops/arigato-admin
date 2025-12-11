"use client";

import { useState } from "react";

export default function StatusBadge({
  status,
  reservationId,
}: {
  status: string;
  reservationId: string;
}) {
  const [value, setValue] = useState(status);

  async function handleChange(newStatus: string) {
    setValue(newStatus);

    await fetch("/api/reservations/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "status_update",
        reservation: {
          ReservationID: reservationId,
          Status: newStatus,
        },
      }),
    });
  }

  const color =
    value === "confirmed"
      ? "bg-green-200 text-green-800"
      : value === "cancelled"
      ? "bg-red-200 text-red-800"
      : "bg-yellow-200 text-yellow-800";

  return (
    <select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className={`px-3 py-1 text-sm rounded-full ${color} border`}
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
