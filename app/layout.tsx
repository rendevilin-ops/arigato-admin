import "./globals.css";

export const metadata = {
  title: "Arigato Reservation System",
  description: "Arigato Restaurant Reservation UI"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
