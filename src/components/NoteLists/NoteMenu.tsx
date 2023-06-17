import React from 'react';
import useCheckLogin from '@/hooks/useCheckLogin';
import { User } from 'next-auth';
import { getNotes } from '@/lib/api';
import Lists from './Lists';

interface getNotesProps {
  user_id: string;
  folder?: string;
  folder_id?: number;
}
interface NoteListsProps extends Partial<getNotesProps> {
  searchParams?: {
    user_id: string;
    folder: string;
    folder_id: number;
    note_id?: number;
  };
  user: User;
}

export const fetchNotes = async ({ user_id, folder_id }: getNotesProps) => {
  if (folder_id) {
    const notes = await getNotes({ user_id: user_id });
    const title = notes[0].folder.name;
    return { notes, title };
  }
  const notes = await getNotes({ user_id: user_id });
  const title = notes[0].folder.name;
  return { notes, title };
};

export const NoteMenu = async ({ searchParams }: NoteListsProps) => {
  const { session } = await useCheckLogin();
  const { notes, title } = await fetchNotes({
    user_id: session!.user.id,
    folder_id: searchParams?.folder_id,
  });
  const note_id = searchParams?.note_id;
  return (
    <div className="fixed top-0 left-0 bottom-0 ml-[305px] w-[350px] custom-scrollbar bg-foreColor/80">
      <div className="flex flex-col h-full my-[30px] px-[20px]">
        <h2 className="text-[22px] font-semibold truncate">{title}</h2>
        <div className="flex flex-col pb-[30px] mt-[30px] gap-[20px]">
          <Lists notes={notes} note_id={note_id} />
        </div>
      </div>
    </div>
  );
};
