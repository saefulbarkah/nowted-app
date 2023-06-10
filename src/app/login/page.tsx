import Auth from "@/components/AuthPages/Auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowted - Login",
};

export default function page() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Auth />
      </div>
    </>
  );
}
