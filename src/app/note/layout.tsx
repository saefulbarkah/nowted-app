import { Sidebar } from "@/components/Sidebar";
import { NoteMenu } from "@/components/NoteLists";
import HydrationZustand from "@/components/HydrationZustand";
import { Toaster } from "@/components/ui/Toaster";
import { Metadata } from "next";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Nowted APP",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await useCheckLogin();
  if (!session) {
    redirect("/login");
  }

  return (
    <HydrationZustand>
      <Sidebar />
      <NoteMenu />
      <div className="relative ml-[655px] custom-scrollbar">{children}</div>
      <Toaster />
    </HydrationZustand>
  );
}
