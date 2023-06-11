import Note from "@/components/NoteEditor/Note";
import Container from "@/components/container";
import React from "react";
import useCheckLogin from "@/hooks/useCheckLogin";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowted APP - note",
};

export default async function page() {
  return (
    <Container>
      <Note />
    </Container>
  );
}
