import Auth from "@/components/AuthPages/Auth";
import useCheckLogin from "@/hooks/useCheckLogin";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Nowted APP - LOGIN",
};

export default async function page() {
  const { session, user } = await useCheckLogin();
  if (session && user) {
    redirect("/note");
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Auth />
      </div>
    </>
  );
}
