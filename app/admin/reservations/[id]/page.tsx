export default function ReservationDetailPage({ params }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reservation Detail</h1>

      <p>ID: {params.id}</p>

      <a
        href="/admin/reservations"
        className="inline-block mt-6 text-blue-600 underline"
      >
        ← Back to list
      </a>
    </div>
  );
}
