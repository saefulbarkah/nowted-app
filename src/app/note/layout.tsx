import { Sidebar } from "@/components/Sidebar";
import { NoteMenu } from "@/components/NoteLists";
import { Toaster } from "@/components/ui/Toaster";
import { Metadata } from "next";
import ReactQueryProvider from "@/lib/reactQueryProvider";
import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Nowted APP",
};
export async function getUser() {
  const { user } = await useCheckLogin();
  return user;
}

export default async function notelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await useCheckLogin();
  if (!session) {
    return redirect("/login");
  }
  const user: any = await getUser();
  return (
    <>
      <Sidebar user={user} />
      <NoteMenu />
      <div className="relative ml-[655px] custom-scrollbar">{children}</div>
      <Toaster />
    </>
  );
}
