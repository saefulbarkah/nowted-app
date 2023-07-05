import TrashLists from '@/components/Trash/TrashLists';
import TrashMenu from '@/components/Trash/TrashMenu';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Nowted - Trash',
};

function page() {
  return (
    <>
      <TrashLists />
      <TrashMenu />
    </>
  );
}

export default page;
