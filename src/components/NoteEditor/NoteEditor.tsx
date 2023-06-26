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
import Image from 'next/image';
import { useActiveNote } from '@/store/useActiveNote';

interface TProps {
  folder_id: string;
}

const NoteEditor = ({ folder_id }: TProps) => {
  const note_id = useActiveNote((state) => state.note_id);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const { note, folder, loading } = useNote({
    find: { note_id: note_id, folder_id: folder_id },
  });
  const { handleSaveTitle, onSave, isError } = useSaveNote({
    folder_id: folder_id,
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
      {!note_id && (
        <div className="flex flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]">
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
      {note_id && (
        <>
          {loading ? (
            <div className="h-screen flex items-center justify-center w-[calc(100vw-650px)]">
              <Loader2 className="w-16 h-16 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-5 w-[calc(100vw-650px)] px-[50px] pt-24 h-screen sticky top-0 overflow-y-auto">
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
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NoteEditor;
