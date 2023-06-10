import { Sidebar } from "@/components/Sidebar";

import "./globals.css";
import { Source_Sans_Pro } from "next/font/google";
import { NoteMenu } from "@/components/NoteLists";
import HydrationZustand from "@/components/HydrationZustand";
import { Toaster } from "@/components/ui/Toaster";

const inter = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Sidebar />
        <NoteMenu />
        <div className="relative ml-[655px] custom-scrollbar">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
