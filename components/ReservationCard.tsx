import React from "react";
import StatusBadge from "./StatusBadge";

export default function ReservationCard({ reservation }: any) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            {reservation.firstName} {reservation.lastName}
          </h2>
          <p className="text-sm text-gray-600">{reservation.arrivalTime}</p>
          <p className="text-sm text-gray-600">{reservation.pax} pax</p>
        </div>
        <StatusBadge status={reservation.status || "pending"} />
      </div>
    </div>
  );
}
