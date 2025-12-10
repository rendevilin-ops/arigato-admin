import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function ReservationCard({ reservation }) {
  const data = reservation;

  const isLunch = data.Service === "lunch";

  const bgColor = isLunch ? "bg-orange-50" : "bg-blue-50";
  const borderColor = isLunch ? "border-orange-300" : "border-blue-300";

  return (
    <Link href={`/admin/reservations/${data.ReservationID}`}>
      <div
        className={`p-4 rounded-lg border ${bgColor} ${borderColor} 
                    flex justify-between items-center mb-3 cursor-pointer 
                    hover:shadow-sm transition`}
      >
        <div>
          <h3 className="font-semibold text-lg">
            {data.FirstName} {data.LastName}
          </h3>

          <p className="text-sm text-gray-600">
            {data.ArrivalTime} / {data.Pax} pax
          </p>

          <p className="text-xs text-gray-500">
            Service: {data.Service}
          </p>
        </div>

        <StatusBadge status={data.Status} />
      </div>
    </Link>
  );
}
