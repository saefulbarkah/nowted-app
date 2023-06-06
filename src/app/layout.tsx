import { Sidebar } from "@/components/ui/Sidebar";

import "./globals.css";
import { Source_Sans_Pro } from "next/font/google";
import { NoteMenu } from "@/components/ui/NoteLists";
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
      <body className={inter.className}>
        <HydrationZustand>
          <Sidebar />
          <NoteMenu />
          <div className="border relative ml-[655px] min-h-screen p-[50px]">
            {children}
          </div>
          <Toaster />
        </HydrationZustand>
      </body>
    </html>
  );
}
