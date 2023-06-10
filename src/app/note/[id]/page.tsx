"use server";
import Note from "@/components/NoteEditor/Note";
import Container from "@/components/container";
import React from "react";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";

export default async function page() {
  const { session } = await useCheckLogin();
  if (!session) {
    return redirect("/login");
  }
  return (
    <Container>
      <Note />
    </Container>
  );
}
