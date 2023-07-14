'use client';
import { FavoriteLists, useFavoriteActive } from '@/components/Favorites';
import { NoteEditor } from '@/components/NoteEditor';
import useNote from '@/hooks/useNote';
import Image from 'next/image';
import React from 'react';

export const Favorites = () => {
  const favoriteActive = useFavoriteActive((state) => state.favoriteActive);
  const { note, folder } = useNote({
    find: {
      note_id: favoriteActive?.id_note as string,
      folder_id: favoriteActive?.folder_id as string,
    },
  });
  return (
    <>
      <FavoriteLists />
      {favoriteActive ? (
        <NoteEditor
          folder={folder!}
          folder_id={favoriteActive.folder_id as string}
          note={note!}
          isActive={favoriteActive}
        />
      ) : (
        <div className="lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]">
          <Image
            alt="icon"
            priority
            src={'/FileText.svg'}
            height={80}
            width={80}
          />
          <h2 className="font-semibold text-[28px]">Select note to view</h2>
          <p className="lg:w-[460px] text-center font-normal text-white/[60%]">
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </>
  );
};
