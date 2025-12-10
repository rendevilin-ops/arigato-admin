"use client";

import { useState } from "react";

// -----------------------
// ダミーデータ（UI確認用）
// 後で API の fetch に切り替える
// -----------------------
const dummyData = [
  {
    ReservationID: "A001",
    ArrivalTime: "18:00",
    FirstName: "Yuma",
    LastName: "Yokoyama",
    Pax: "2",
    Status: "pending",
  },
  {
    ReservationID: "A002",
    ArrivalTime: "19:30",
    FirstName: "Marie",
    LastName: "Dupont",
    Pax: "3",
    Status: "confirmed",
  },
  {
    ReservationID: "A003",
    ArrivalTime: "21:00",
    FirstName: "Pierre",
    LastName: "Martin",
    Pax: "1",
    Status: "cancelled",
  },
];

// -----------------------
// Status Badge コンポーネント
// -----------------------
function StatusBadge({ status }: { status: string }) {
  const COLOR: any = {
    pending: "bg-yellow-200 text-yellow-800",
    confirmed: "bg-green-200 text-green-800",
    cancelled: "bg-red-200 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm ${COLOR[status]}`}>
      {status}
    </span>
  );
}

// -----------------------
// メイン Day View
// -----------------------
export default function AdminDayView() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);

  const prevDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d.toISOString().split("T")[0]);
  };

  const nextDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d.toISOString().split("T")[0]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Réservations – {date}</h1>

      {/* 日付コントロール */}
      <div className="flex items-center gap-4">
        <button onClick={prevDay} className="px-3 py-2 border rounded">
          ← 前日
        </button>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button onClick={nextDay} className="px-3 py-2 border rounded">
          翌日 →
        </button>
      </div>

      {/* 予約一覧 */}
      <div className="space-y-3">
        {dummyData.map((r) => (
          <div
            key={r.ReservationID}
            className="border rounded p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">
                {r.ArrivalTime} — {r.FirstName} {r.LastName}
              </p>
              <p className="text-gray-600">{r.Pax} couverts</p>
            </div>

            <div className="flex items-center gap-4">
              <StatusBadge status={r.Status} />

              <a
                href={`/admin/reservations/${r.ReservationID}`}
                className="text-blue-600 underline"
              >
                Détails
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
