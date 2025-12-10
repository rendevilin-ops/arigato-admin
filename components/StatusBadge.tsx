export default function StatusBadge({ status }: { status: string }) {
  const style =
    status === "confirmed"
      ? "bg-green-200 text-green-800"
      : "bg-yellow-200 text-yellow-800";

  return (
    <span className={`px-3 py-1 text-sm rounded-full ${style}`}>
      {status}
    </span>
  );
}
