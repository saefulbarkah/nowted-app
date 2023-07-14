import { Favorites } from '@/features/Nowted/Favorites';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Nowted - Favorites',
};

function page() {
  return (
    <>
      <Favorites />
    </>
  );
}

export default page;
