"use client";

import { useState } from "react";

export default function StatusBadge({
  reservation,
}: {
  reservation: any;
}) {
  const [value, setValue] = useState(reservation.Status);

  async function handleChange(newStatus: string) {
    setValue(newStatus);

    // ★ 変更後の予約データを作る
    const updatedData = {
      ...reservation,
      Status: newStatus,
      UpdateAt: new Date().toISOString(),
    };

    // ★ Payload を ReservationDetailPage と同じ形式にする
    const payload = {
      type: "reservation_update",
      reservation: updatedData,
    };

    await fetch("/api/reservations/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
