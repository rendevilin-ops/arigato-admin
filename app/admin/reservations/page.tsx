import "../../globals.css";
import { useEffect, useState } from "react";
import ReservationCard from "@/components/ReservationCard";
import Loading from "@/components/Loading";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 後で N8N API に差し替える
  async function fetchReservations() {
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();
      setReservations(data.rows || []);
    } catch (e) {
      console.error("Failed to fetch reservations", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservations - Day View</h1>

      {loading && <Loading />}

      {!loading && reservations.length === 0 && (
        <p className="text-gray-500">No reservations for today.</p>
      )}

      <div className="flex flex-col gap-4">
        {reservations.map((r: any) => (
          <ReservationCard key={r.id} reservation={r} />
        ))}
      </div>
    </div>
  );
}
