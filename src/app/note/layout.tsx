import { Sidebar } from "@/components/Sidebar";
import { NoteMenu } from "@/components/NoteLists";
import { Toaster } from "@/components/ui/Toaster";
import { Metadata } from "next";
import ReactQueryProvider from "@/lib/reactQueryProvider";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";

export default async function notelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await useCheckLogin();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <ReactQueryProvider>
        <Sidebar />
        <NoteMenu />
        <div className="relative ml-[655px] custom-scrollbar">{children}</div>
        <Toaster />
      </ReactQueryProvider>
    </>
  );
}
