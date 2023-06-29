'use client';
import { NoteTypes } from '@/types';
import React from 'react';
import useFolderState from './useFolderState';

function useFavorites() {
  const [favorites, setFavorites] = React.useState<NoteTypes[] | null>(null);
  const { folders } = useFolderState();
  function getFavorites() {
    const findNoteOnFavorites = folders.reduce((results, item) => {
      const filteredData = item.notes.filter(
        (item: NoteTypes) => item.favorite === true && item.deletedAt === null
      );
      return results.concat(filteredData as []);
    }, []);
    setFavorites(findNoteOnFavorites);
  }

  React.useEffect(() => {
    getFavorites();
  }, [folders]);

  return { favorites };
}

export default useFavorites;
