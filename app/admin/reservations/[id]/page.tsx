interface ReservationDetailProps {
  params: { id: string };
}

export default function ReservationDetailPage({ params }: ReservationDetailProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Reservation Detail: {params.id}
      </h1>
      <p className="text-gray-600">Reservation detail view is under construction.</p>
    </div>
  );
}
