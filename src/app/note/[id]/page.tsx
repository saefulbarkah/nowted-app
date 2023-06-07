"use server";
import Note from "@/components/NoteEditor/Note";
import React from "react";

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const id = params.id;
  return {
    title: "Note id :" + id,
  };
}

async function page({ params }: any) {
  console.log(params);
  return (
    <div>
      <Note />
    </div>
  );
}

export default page;
