import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function ReservationCard({ reservation }) {
  const data = reservation;

  const isLunch = data.service === "lunch";
  const bgColor = isLunch ? "bg-orange-50" : "bg-blue-50";
  const borderColor = isLunch ? "border-orange-300" : "border-blue-300";

  return (
    <div
      className={`p-4 rounded-lg border ${bgColor} ${borderColor}
                  flex justify-between items-center mb-3`}
    >
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

      {/* ★ StatusBadge に ReservationID を渡す */}
      <StatusBadge
        status={data.Status}
        reservationId={data.ReservationID}
      />
    </div>
  );
}
