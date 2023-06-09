import React from "react";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/Toaster";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await useCheckLogin();
  if (session) {
    redirect("/note");
  }
  return (
    <div className="px-[30px]">
      {children}
      <Toaster />
    </div>
  );
}
