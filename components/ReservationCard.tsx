import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function ReservationCard({ reservation }: any) {
  return (
    <Link
      href={`/admin/reservations/${reservation.ReservationID}`}
      className="block border rounded-lg p-4 shadow-sm bg-white hover:bg-gray-50 transition"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            {reservation.FirstName} {reservation.LastName}
          </h2>

          <p className="text-sm text-gray-700">
            {reservation.ArrivalTime} / {reservation.Pax} pax
          </p>

          <p className="text-sm text-gray-500">
            Service: {reservation.Service}
          </p>
        </div>

        <StatusBadge status={reservation.Status || "pending"} />
      </div>
    </Link>
  );
}
