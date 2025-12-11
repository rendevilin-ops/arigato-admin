import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="text-xl font-bold">Arigato Admin</div>

      <nav className="space-x-6">
        <Link href="https://arigato-five.vercel.app/aifutan-index.html">Nouvelle réservation</Link>
        
      </nav>
    </header>
  );
}
