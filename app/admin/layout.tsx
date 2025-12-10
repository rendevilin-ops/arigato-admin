import "../globals.css"; // 1階層上へ修正
import Header from "../../components/Header"; // 相対パスに変更

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
