import Link from "next/link";
import { useState } from "react";

export default function ReservationCard({ reservation }) {
  const data = reservation;
  const [status, setStatus] = useState(data.Status);

  const isLunch = data.service === "lunch";
  const bgColor = isLunch ? "bg-orange-50" : "bg-blue-50";
  const borderColor = isLunch ? "border-orange-300" : "border-blue-300";

  // ★ Status 変更時に API を叩く
  async function handleStatusChange(newStatus) {
    setStatus(newStatus);

  await fetch("/api/reservations/update-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "status_update",
      reservation: {
        ReservationID: data.ReservationID,
        Status: newStatus,
      }
    }),
  });

  }

  return (
    <div
      className={`p-4 rounded-lg border ${bgColor} ${borderColor} 
                  flex justify-between items-center mb-3`}
    >
      {/* 左：予約詳細ページへのリンク部分 */}
      <Link 
        href={`/admin/reservations/${data.ReservationID}`}
        className="flex-1 cursor-pointer"
      >
        <div>
          <h3 className="font-semibold text-lg">
            {data.FirstName} {data.LastName}
          </h3>

          <p className="text-sm text-gray-600">
            {data.ArrivalTime} / {data.Pax} pax
          </p>

          <p className="text-xs text-gray-500">
            Service: {data.service}
          </p>
        </div>
      </Link>

      {/* 右：Status セレクト */}
      <div className="ml-4">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
          onClick={(e) => e.stopPropagation()} // ★ Link へイベント伝播させない
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}
