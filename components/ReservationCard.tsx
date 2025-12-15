import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function ReservationCard({ reservation }) {
  const data = reservation;

  const isLunch = data.service === "lunch";
  let bgColor = isLunch ? "bg-orange-50" : "bg-blue-50";
  let borderColor = isLunch ? "border-orange-300" : "border-blue-300";
  let textColor = "text-black";
  let strike = "";

  if (data.Status === "cancelled") {
    bgColor = "bg-gray-200";
    borderColor = "border-gray-400";
    textColor = "text-gray-500";
    strike = "line-through";
  }

  return (
    <div
      className={`p-4 rounded-lg border ${bgColor} ${borderColor}
                  flex justify-between items-center mb-3`}
    >
      {/* ▼ 左：詳細リンク */}
      <Link
        href={`/admin/reservations/${data.ReservationID}`}
        className="flex-1 cursor-pointer min-w-0"
      >
        <div className={`${textColor} ${strike} min-w-0`}>
          <h3 className="font-semibold text-lg leading-tight">
            <div className="truncate">{data.FirstName}</div>
            <div className="truncate">{data.LastName}</div>
          </h3>

          <p className="text-sm text-gray-700">
            {data.ArrivalTime} / {data.Pax} pax · {data.service}
          </p>

          {/* ▼ バッジ */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {data.Kaiseki === true && (
              <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">
                Kaiseki
              </span>
            )}
            {data.Sake === true && (
              <span className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700">
                Sake Pairing
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* ▼ 右：ステータスバッジ（リンク外、絶対に独立） */}
      <div className="ml-3 flex-shrink-0">
        <StatusBadge reservation={data} />
      </div>
    </div>
  );
}
