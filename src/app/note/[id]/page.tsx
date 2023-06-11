import Note from "@/components/NoteEditor/Note";
import Container from "@/components/container";
import React from "react";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowted APP - note",
};

export async function checkUser() {
  const { session, user } = await useCheckLogin();
  return { session, user };
}

export default async function page() {
  const { session, user } = await checkUser();
  if (!session || !user) {
    console.log(user);
    return redirect("/login");
  }
  return (
    <Container>
      <Note />
    </Container>
  );
}
