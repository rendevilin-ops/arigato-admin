import "../../globals.css";
import Header from "@/components/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100">
        <Header />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
