import React from "react";
import { Toaster } from "@/components/ui/Toaster";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowted APP - LOGIN",
};

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
