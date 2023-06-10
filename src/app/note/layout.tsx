import { Sidebar } from "@/components/Sidebar";
import { NoteMenu } from "@/components/NoteLists";
import { Toaster } from "@/components/ui/Toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowted APP",
};

export default function notelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <NoteMenu />
      <div className="relative ml-[655px] custom-scrollbar">{children}</div>
      <Toaster />
    </>
  );
}
