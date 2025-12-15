"use client";

import { useEffect, useState } from "react";
import ReservationCard from "@/components/ReservationCard";
import Loading from "@/components/Loading";

// 今日の日付 YYYY-MM-DD
function today() {
  return new Date().toISOString().split("T")[0];
}

// 日付を前後にずらす関数（唯一）
function shiftDate(date: string, diff: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + diff);
  return d.toISOString().split("T")[0];
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(today());

  async function load(date: string) {
    setLoading(true);

    try {
      const res = await fetch(`/api/reservations?date=${date}`, {
        cache: "no-store",
      });

      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error("Failed to load reservations", err);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reservations</h1>

      {/* ←→ ボタン付き 日付選択 */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelectedDate(shiftDate(selectedDate, -1))}
          className="px-3 py-2 bg-gray-700 text-white rounded"
        >
          ←
        </button>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />

        <button
          onClick={() => setSelectedDate(shiftDate(selectedDate, +1))}
          className="px-3 py-2 bg-gray-700 text-white rounded"
        >
          →
        </button>
      </div>

      {/* ▼ 予約件数 & メトリクス */}
      {!loading && reservations.length > 0 && (
        <div className="text-lg font-semibold mt-2 space-y-1">
          <div>
            {reservations.length} Booking{reservations.length > 1 ? "s" : ""} (
            {reservations.reduce((sum, r) => sum + Number(r.Pax || 0), 0)} Guests
            )
          </div>

          {/* 会席数 */}
          <div className="text-sm text-red-700">
            Kaiseki:{" "}
            {reservations.filter(
              (r) =>
                r.Kaiseki === true ||
                r.Kaiseki === "TRUE" ||
                r.Kaiseki === "true" ||
                r.Kaiseki === 1
            ).length}
          </div>

          {/* 酒ペアリング数 */}
          <div className="text-sm text-blue-700">
            Sake Pairing:{" "}
            {reservations.filter(
              (r) =>
                r.Sake === true ||
                r.Sake === "TRUE" ||
                r.Sake === "true" ||
                r.Sake === 1
            ).length}
          </div>
        </div>
      )}

      {loading && <Loading />}

      {!loading && reservations.length === 0 && (
        <p className="text-gray-500">No reservations.</p>
      )}

      <div className="flex flex-col gap-3">
        {reservations.map((r) => (
          <ReservationCard key={r.ReservationID} reservation={r} />
        ))}
      </div>
    </div>
  );
}
