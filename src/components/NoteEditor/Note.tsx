'use client';
import React from 'react';
import Dvider from '../ui/Dvider';
import { LuCalendarDays, LuFolder, LuLoader2 } from 'react-icons/lu';
import NoteMenuList from './NoteMenuList';
import { Editor } from '../ui/Editor';
import { useNote } from '@/hooks/useNote';
import { useSearchParams } from 'next/navigation';
import { dateToString } from '@/lib/utils';

const Note = () => {
  const searchParams = useSearchParams();
  const getFolderId = searchParams.get('folder_id');
  const currentNoteId = searchParams.get('note_id');
  const { note, folder, loading } = useNote({
    find: { note_id: currentNoteId!, folder_id: getFolderId! },
  });
  return (
    <>
      {loading ? (
        <div className="min-h-screen items-center justify-center flex">
          <LuLoader2 className="h-[50px] w-[50px] animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[32px] text-white">
              {note?.name}
            </h2>
            <NoteMenuList />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5 items-center">
              <LuCalendarDays className="text-[20px]" />
              <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
                Date
              </p>
              <p className="font-semibold text-white">
                {dateToString({ values: note?.createdAt })}
              </p>
            </div>
            <Dvider />
            <div className="flex gap-5 items-center">
              <LuFolder className="text-[20px]" />
              <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
                Folder
              </p>
              <p className="font-semibold text-white">{folder?.name}</p>
            </div>
          </div>
          <div className="min-h-screen w-full">
            <Editor content={note?.content} />
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
