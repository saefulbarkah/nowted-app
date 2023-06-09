import "./globals.css";
import { Source_Sans_Pro } from "next/font/google";

const inter = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
