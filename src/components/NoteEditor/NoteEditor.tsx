'use client';
import React, { useEffect, useState } from 'react';
import Dvider from '../ui/Dvider';
import { LuCalendarDays, LuFolder, LuLoader2 } from 'react-icons/lu';
import NoteMenuList from './NoteMenuList';
import { Editor } from '../ui/Editor';
import { useSearchParams } from 'next/navigation';
import { dateToString } from '@/lib/utils';
import Editable from '../ui/Editable';
import { useNowtedStore } from '@/store';
import useSaveNote from '@/hooks/useSaveNote';
import { Loader2 } from 'lucide-react';
import useNote from '@/hooks/useNote';

const Note = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const searchParams = useSearchParams();
  const getFolderId = searchParams.get('folder_id');
  const currentNoteId = searchParams.get('note_id');
  const { note, folder, loading } = useNote({
    find: { note_id: currentNoteId!, folder_id: getFolderId! },
  });
  const { handleSaveTitle, onSave, isError } = useSaveNote({
    folder_id: getFolderId,
    name: title,
    id_note: note?.id_note,
    content: note?.content,
  });

  useEffect(() => {
    if (note) {
      setTitle(note.name);
    }
  }, [note]);

  return (
    <>
      {loading ? (
        <div className="min-h-screen items-center justify-center flex">
          <LuLoader2 className="h-[50px] w-[50px] animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center gap-5 relative">
            <Editable
              className={`text-[30px] text-white font-semibold w-full border-white/[5%] border-b ${
                onSave && 'opacity-10'
              } ${isError && 'border-red-500 border-b'}`}
              value={title}
              maxLength={50}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleSaveTitle()}
            />
            {onSave && (
              <div className="absolute inset-0 flex justify-center">
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-6 w-6" />
                  <p>Saving note ....</p>
                </div>
              </div>
            )}
            <NoteMenuList data={note!} />
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
            <Editor content={note!.content!} />
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
