import React from "react";
import { Toaster } from "@/components/ui/Toaster";

export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-[30px]">
      {children}
      <Toaster />
    </div>
  );
}
