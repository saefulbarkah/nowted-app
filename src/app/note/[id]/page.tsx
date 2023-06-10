"use server";
import Note from "@/components/NoteEditor/Note";
import Container from "@/components/container";
import React from "react";

import { Metadata, ResolvingMetadata } from "next";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const randomizeNumber = Math.floor(Math.random() * 5);

  return {
    title: `Title - ${randomizeNumber}`,
    description: "testlah",
  };
}

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
