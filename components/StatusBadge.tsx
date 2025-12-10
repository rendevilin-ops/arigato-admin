export default function StatusBadge({ status }: { status: string }) {
  const color =
    status === "confirmed"
      ? "bg-green-200 text-green-800"
      : "bg-yellow-200 text-yellow-800";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {status}
    </span>
  );
}
