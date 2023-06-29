import { FavoriteLists } from '@/components/Favorites';
import { FavoriteEditor } from '@/components/Favorites/FavoritesMenu';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Nowted - Favorites',
};

function page() {
  return (
    <>
      <FavoriteLists />
      <FavoriteEditor />
    </>
  );
}

export default page;
