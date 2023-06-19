import Note from '@/components/NoteEditor/Note';
import Container from '@/components/container';
import React from 'react';

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const id = params.id;
  return {
    title: 'Note id :' + id,
  };
}

async function page({ params }: any) {
  return (
    <Container>
      <Note />
    </Container>
  );
}

export default page;
