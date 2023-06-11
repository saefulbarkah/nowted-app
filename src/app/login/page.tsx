import Auth from "@/components/AuthPages/Auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nowted APP - LOGIN",
};

export default async function page() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Auth />
      </div>
    </>
  );
}
