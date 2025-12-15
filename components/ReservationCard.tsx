import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function ReservationCard({ reservation }) {
  const data = reservation;

  // ★ service 色分け
  const isLunch = data.service === "lunch";
  let bgColor = isLunch ? "bg-orange-50" : "bg-blue-50";
  let borderColor = isLunch ? "border-orange-300" : "border-blue-300";
  let textColor = "text-black";
  let strike = "";

  // ★ Cancelled の場合：グレーアウト + 打ち消し線
  if (data.Status === "cancelled") {
    bgColor = "bg-gray-200";
    borderColor = "border-gray-400";
    textColor = "text-gray-500";
    strike = "line-through"; // ← 打ち消し線
  }

  return (
    <div
      className={`p-4 rounded-lg border ${bgColor} ${borderColor}
                  flex justify-between items-center mb-3`}
    >
      <Link
        href={`/admin/reservations/${data.ReservationID}`}
        className="flex-1 cursor-pointer"
      >
        <div className={`${textColor} ${strike}`}>
          <h3 className="font-semibold text-lg">
            {data.FirstName} {data.LastName}
          </h3>
        
          <p className="text-sm text-gray-700">
            {data.ArrivalTime} / {data.Pax} pax · {data.service}
          </p>
        
          {/* ▼ バッジは1段下げて控えめに */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {data.Kaiseki && (
              <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">
                Kaiseki
              </span>
            )}
            {data.Sake && (
              <span className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700">
                Sake Pairing
              </span>
            )}
          </div>
        </div>

      </Link>

      <StatusBadge reservation={data} />
    </div>
  );
}
