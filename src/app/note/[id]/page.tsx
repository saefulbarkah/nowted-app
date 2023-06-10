"use server";
import Note from "@/components/NoteEditor/Note";
import Container from "@/components/container";
import React from "react";

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  return {
    title: id,
    description: "testlah",
  };
}

export default async function page() {
  return (
    <Container>
      <Note />
    </Container>
  );
}
