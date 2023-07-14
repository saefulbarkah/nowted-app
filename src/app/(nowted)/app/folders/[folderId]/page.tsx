import { FolderLists } from '@/features/Nowted/Folders';
import { Metadata } from 'next';
import React from 'react';

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
      <FolderLists params={params} />
    </>
  );
}

export default page;
