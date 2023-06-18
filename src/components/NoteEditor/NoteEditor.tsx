'use client';
import { noteTypes } from '@/types';
import React, { FC, useState } from 'react';
import Editable from '../ui/Editable';
import NoteMenuList from './NoteMenuList';
import { LuCalendarDays, LuFolder } from 'react-icons/lu';
import { dateToString } from '@/lib/utils';
import Dvider from '../ui/Dvider';
import { Editor } from '../ui/Editor';
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getNotesById, saveNotesById } from '@/lib/api';
import { User } from 'next-auth';
import LoadingIcons from 'react-loading-icons';

interface NoteEditorProps {
  searchParams: {
    note_id?: number;
  };
  user: User;
}

const NoteEditor: FC<NoteEditorProps> = ({ searchParams, user }) => {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();
  const queryNote = async () => {
    const data = await getNotesById({
      id: Number(searchParams.note_id),
    });
    return data;
  };
  const { data: note, isLoading } = useQuery({
    queryKey: ['find-note'],
    queryFn: async () => await queryNote(),
    onSuccess: async (data) => {
      setTitle(data.name);
    },
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const isMutationNote = useIsMutating({ mutationKey: ['save-note'] });

  const handleSavingNote = async (data: Partial<noteTypes>) => {
    await saveNotesById({ id: data.id, name: title });
  };

  const { mutate: handleSaveNote } = useMutation(handleSavingNote, {
    mutationKey: ['save-note'],
    onSuccess: async () => {
      await queryClient.invalidateQueries(['find-note']);
      await queryClient.invalidateQueries(['notes']);
      setIsEdit(false);
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingIcons.Oval fontSize={100} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Editable
              className={`text-[30px] text-white font-semibold w-full ${
                Boolean(isMutationNote) && 'opacity-50'
              }`}
              defaultValue={note.name}
              maxLength={50}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleSaveNote({ id: note.id })}
            />
            <NoteMenuList />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5 items-center">
              <LuCalendarDays className="text-[20px]" />
              <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
                Date
              </p>
              <p className="font-semibold text-white">
                {dateToString({ values: note.created_at })}
              </p>
            </div>
            <Dvider />
            <div className="flex gap-5 items-center">
              <LuFolder className="text-[20px]" />
              <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
                Folder
              </p>
              <p className="font-semibold text-white">{note.folder.name}</p>
            </div>
          </div>
          <div className="min-h-screen">
            <Editor content={note.content} />
          </div>
        </>
      )}
    </>
  );
};

export default NoteEditor;
