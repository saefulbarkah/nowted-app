import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";

export default async function page() {
  const { session } = await useCheckLogin();

  if (!session) {
    redirect("/login");
  }
  redirect("/note");
}
