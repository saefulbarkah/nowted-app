import NoteMenu from '@/components/NoteLists/NoteMenu';
import { Metadata } from 'next';
import React from 'react';
import NoteEditor from '@/components/NoteEditor/NoteEditor';

type Props = {
  params: { folderId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: 'Nowted APP',
};

function page({ params }: Props) {
  return (
    <>
      <NoteMenu folder_id={params.folderId} />
      <NoteEditor folder_id={params.folderId} />
    </>
  );
}

export default page;
