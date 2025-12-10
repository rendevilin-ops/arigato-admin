import { notFound } from "next/navigation";
import { headers } from "next/headers";

export default async function ReservationDetailPage({ params }) {
  const { id } = params;

  if (!id) return notFound();

  // ★ Host ヘッダーを取得
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  // ★ 絶対 URL を構築
  const url = `${protocol}://${host}/api/reservations?id=${id}`;

  // ★ fetch
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return notFound();

  const data = await res.json();
  if (!data) return notFound();


}
