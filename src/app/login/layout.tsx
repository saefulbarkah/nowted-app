import React from "react";
import { Toaster } from "@/components/ui/Toaster";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await useCheckLogin();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="px-[30px]">
      {children}
      <Toaster />
    </div>
  );
}
