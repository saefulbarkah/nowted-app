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
import { useActiveNote } from '@/store/useActiveNote';
import EditorToolbar from '../ui/Editor/EditorToolbar';
import useNoteEditor from '@/hooks/useNoteEditor';
import { EditorTipTap } from '../ui/Editor';
import { FolderTypes, NoteTypes } from '@/types';
import BubbleEditor from '../ui/Editor/BubbleEditor';
import { NoteMenuList } from './NoteMenuLists';
import { AiFillFolder } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import { NoteEditorMobile } from '../Mobile/Note';

export interface TNoteEditorProps {
  folder_id: string;
  note: NoteTypes;
  folder: FolderTypes;
  isActive: NoteTypes | null;
}

export const NoteEditor = ({
  folder_id,
  folder,
  note,
  isActive,
}: TNoteEditorProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const isBigScreen = useMediaQuery({ minWidth: 1024 });

  // hooks
  const { handleSaveTitle, onSave, isError } = useSaveNote({
    folder_id: folder_id,
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

  if (!isBigScreen)
    return (
      <NoteEditorMobile
        folder_id={folder_id}
        folder={folder}
        note={note}
        isActive={isActive}
      />
    );

  return (
    <>
      <div className="lg:w-[calc(100vw-650px)] w-full px-[50px] lg:h-screen h-[calc(100vh-80px)] overflow-y-auto">
        <header className="sticky top-0 bg-background pt-[30px]">
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
