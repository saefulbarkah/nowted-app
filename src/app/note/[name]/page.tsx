import Note from '@/components/NoteEditor/NoteEditor';
import NoteMenu from '@/components/NoteLists/NoteMenu';
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
    <>
      {/* <NoteMenu params={params} /> */}
      <Note />
    </>
  );
}

export default page;
