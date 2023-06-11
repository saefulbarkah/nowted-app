import useCheckLogin from "@/hooks/useCheckLogin";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowted APP",
};

export async function checkUser() {
  const { session, user } = await useCheckLogin();
  return { session, user };
}

export default async function page() {
  const { session, user } = await checkUser();
  if (!session || !user) {
    return redirect("/login");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-[10px] items-center">
        <Image
          alt="icon"
          priority
          src={"/FileText.svg"}
          height={80}
          width={80}
        />
        <h2 className="font-semibold text-[28px]">Select note to view</h2>
        <p className="w-[460px] text-center font-normal text-white/[60%]">
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    </div>
  );
}
