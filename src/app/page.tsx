import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";

export async function checkUser() {
  const { session, user } = await useCheckLogin();
  return { session, user };
}

export default async function page() {
  const { session } = await checkUser();
  if (!session) {
    return redirect("/login");
  }
  return redirect("/note");
}
