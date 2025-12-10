"use client";

import { useEffect, useState } from "react";
import ReservationCard from "@/components/ReservationCard";
import Loading from "@/components/Loading";

// 今日の日付 YYYY-MM-DD
function today() {
  return new Date().toISOString().split("T")[0];
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

      {/* 日付選択 */}
      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
      </div>

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
