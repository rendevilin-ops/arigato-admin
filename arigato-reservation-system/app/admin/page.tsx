"use client";

import { useEffect, useState } from "react";

type Reservation = {
  ReservationID: string;
  Date: string;
  Service: string;
  ArrivalTime: string;
  FirstName: string;
  LastName: string;
  Pax: string;
  Status: string;
};

export default function AdminDayView() {
  const [date, setDate] = useState<string>(() => {
    // 今日の日付 YYYY-MM-DD を生成
    return new Date().toISOString().split("T")[0];
  });

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 予約データの取得
  const fetchReservations = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/reservations?date=${date}`, {
        cache: "no-store",
      });

      const json = await res.json();
      setReservations(json);
    } catch (err) {
      console.error("Failed to load reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  // 初回ロード & 日付変更で実行
  useEffect(() => {
    fetchReservations();
  }, [date]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Réservations – {date}</h1>

      {/* 日付選択 */}
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* ローディング */}
      {loading && <p>Chargement...</p>}

      {/* データがない場合 */}
      {!loading && reservations.length === 0 && (
        <p className="text-gray-500">Aucune réservation pour cette date.</p>
      )}

      {/* 予約リスト */}
      <div className="space-y-3">
        {reservations.map((r) => (
          <div
            key={r.ReservationID}
            className="border rounded p-4 shadow-sm flex justify-between items-center hover:bg-gray-50 cursor-pointer"
          >
            <div>
              <p className="text-lg font-semibold">
                {r.ArrivalTime} — {r.FirstName} {r.LastName}
              </p>
              <p className="text-gray-600">
                {r.Pax} couverts • {r.Status}
              </p>
            </div>

            {/* 詳細画面へのリンク */}
            <a
              href={`/admin/reservations/${r.ReservationID}`}
              className="text-blue-600 underline"
            >
              Détails
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
