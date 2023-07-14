'use client';
import { NoteEditorMobile } from '@/components/Mobile/Note';
import { NoteEditor } from '@/components/NoteEditor';
import { NoteLists } from '@/components/NoteLists';
import useNote from '@/hooks/useNote';
import { useActiveNote } from '@/store/useActiveNote';
import Image from 'next/image';
import React from 'react';

type TProps = {
  params: { folderId: string };
};

export const FolderLists = ({ params }: TProps) => {
  const activeNote = useActiveNote((state) => state.activeNote);
  const { note, folder } = useNote({
    find: {
      note_id: activeNote?.id_note as string,
      folder_id: params.folderId,
    },
  });

  return (
    <>
      <NoteLists folder_id={params.folderId} />
      {activeNote ? (
        <>
          <NoteEditor
            folder_id={params.folderId}
            folder={folder!}
            note={note!}
            isActive={activeNote}
          />
        </>
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
          <p className="w-[460px] text-center font-normal text-white/[60%]">
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </>
  );
};
