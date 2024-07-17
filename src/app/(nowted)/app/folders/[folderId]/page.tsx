import { FolderLists } from '@/features/Nowted/Folders';
import React from 'react';

type Props = {
  params: { folderId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

function page({ params }: Props) {
  return (
    <>
      <FolderLists params={params} />
    </>
  );
}

export default page;
