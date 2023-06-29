'use client';
import React, { useEffect, useState } from 'react';
import Dvider from '../ui/Dvider';
import { LuCalendarDays } from 'react-icons/lu';
import { dateToString } from '@/lib/utils';
import Editable from '../ui/Editable';
import useSaveNote from '@/hooks/useSaveNote';
import { Loader2 } from 'lucide-react';
import useNote from '@/hooks/useNote';
import Image from 'next/image';
import EditorToolbar from '../ui/Editor/EditorToolbar';
import useNoteEditor from '@/hooks/useNoteEditor';
import { EditorTipTap } from '../ui/Editor';
import { NoteTypes } from '@/types';
import BubbleEditor from '../ui/Editor/BubbleEditor';
import { AiFillFolder } from 'react-icons/ai';
import { NoteMenuList } from '../NoteEditor/NoteMenuLists';
import { useFavoriteActive } from './FavoriteLists';

export const FavoriteEditor = () => {
  const favoriteActive = useFavoriteActive((state) => state.favoriteActive);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const { note, folder } = useNote({
    find: {
      note_id: favoriteActive?.id_note as string,
      folder_id: favoriteActive?.folder_id as string,
    },
  });
  const { handleSaveTitle, onSave, isError } = useSaveNote({
    folder_id: favoriteActive?.folder_id as string,
    name: title,
    id_note: note?.id_note,
    content: note?.content,
  });

  const editor = useNoteEditor({ data: note as NoteTypes });

  useEffect(() => {
    if (note) {
      setTitle(note.name);
      editor?.commands.setContent(`${note.content}`);
    }
  }, [note]);

  if (!favoriteActive) {
    return (
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
    );
  }

  return (
    <>
      <div className="w-[calc(100vw-650px)] px-[50px] h-screen overflow-y-auto">
        <header className="sticky top-0 bg-background pt-[30px] z-50">
          <div className="flex justify-between items-center gap-5 mb-[20px] relative">
            <Editable
              className={`text-[30px] text-white font-semibold w-full border-white/[5%] border-b  ${
                onSave && 'opacity-10 blur-sm'
              } ${isError && 'border-red-500 border-b'}`}
              value={title}
              maxLength={50}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={async () => {
                await handleSaveTitle();
                setIsEdit(false);
              }}
            />
            {onSave && (
              <div className="absolute inset-0 flex justify-center">
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-6 w-6 mr-2" />
                  <p>Saving note ....</p>
                </div>
              </div>
            )}
            <NoteMenuList data={note!} />
          </div>
          <div className="flex flex-col gap-5 justify-center">
            <div className="flex gap-[10px]  items-center">
              <LuCalendarDays className="text-[20px]" />
              <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
                Date
              </p>
              <p className="font-semibold text-white">
                {dateToString({ values: note?.createdAt })}
              </p>
            </div>
            <Dvider />
            <div className="flex gap-[10px] mb-5  items-center">
              <AiFillFolder className="text-[20px] text-orange-300" />
              <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
                Folder
              </p>
              <p className="font-semibold text-white">{folder?.name}</p>
            </div>
          </div>
          <EditorToolbar editor={editor} />
        </header>
        <BubbleEditor editor={editor} />
        <EditorTipTap editor={editor} />
      </div>
    </>
  );
};
