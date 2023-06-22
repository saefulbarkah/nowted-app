import Note from '@/components/NoteEditor/Note';
import Container from '@/components/container';
import React from 'react';

type Props = {
  params: { name: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const name = params.name;
  return {
    title: 'Nowted APP - ' + name,
  };
}

function page({ params }: any) {
  return (
    <Container>
      <Note />
    </Container>
  );
}

export default page;
