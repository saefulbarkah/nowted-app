import Note from "@/components/NoteEditor/Note";
import Container from "@/components/container";
import { Metadata } from "next";

interface paramsProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: paramsProps): Promise<Metadata> {
  const id = params.id;
  return {
    title: "Nowted - " + id,
  };
}
export default async function page() {
  return (
    <Container>
      <Note />
    </Container>
  );
}
