'use client';
import React, { useEffect, useState } from 'react';
import { LuCalendarDays } from 'react-icons/lu';
import { dateToString } from '@/lib/utils';
import useSaveNote from '@/hooks/useSaveNote';
import { Loader2 } from 'lucide-react';
import useNote from '@/hooks/useNote';
import { useActiveNote } from '@/store/useActiveNote';
import useNoteEditor from '@/hooks/useNoteEditor';
import { NoteTypes } from '@/types';
import { AiFillFolder } from 'react-icons/ai';
import { TNoteEditorProps } from '@/components/NoteEditor';
import Editable from '@/components/ui/Editable';
import { NoteMenuList } from '@/components/NoteEditor/NoteMenuLists';
import Dvider from '@/components/ui/Dvider';
import EditorToolbar from '@/components/ui/Editor/EditorToolbar';
import BubbleEditor from '@/components/ui/Editor/BubbleEditor';
import { EditorTipTap } from '@/components/ui/Editor';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useFavoriteActive } from '@/components/Favorites';

export const NoteEditorMobile = ({
  folder_id,
  folder,
  note,
  isActive,
}: TNoteEditorProps) => {
  const setFavoriteActive = useFavoriteActive(
    (state) => state.setFavoriteActive
  );
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
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

  return (
    <>
      {isActive && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0 }}
            exit={{ opacity: 0 }}
            key={'note-lists'}
          >
            <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden w-full px-[20px]">
              <header className="sticky top-0 bg-background pt-[20px]">
                <div className="flex items-center gap-5 mb-[20px] relative">
                  <Editable
                    className={`lg:text-[22px] text-lg text-white font-semibold w-full border-white/[5%] border-b  ${
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
                    <p className="font-semibold text-white lg:text-base text-sm">
                      {dateToString({ values: note?.createdAt })}
                    </p>
                  </div>
                  <Dvider />
                  <div className="flex gap-[10px] mb-5  items-center">
                    <AiFillFolder className="text-[20px] text-orange-300" />
                    <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
                      Folder
                    </p>
                    <p className="font-semibold text-white lg:text-base text-sm">
                      {folder?.name}
                    </p>
                  </div>
                </div>
                <EditorToolbar editor={editor} />
              </header>
              <BubbleEditor editor={editor} />
              <EditorTipTap editor={editor} />
            </div>
          </motion.div>
          <div className="fixed bottom-0 left-0 translate-x-[10px] z-[10] -translate-y-[10px]">
            <Button
              variant={'secondary'}
              onClick={() => {
                setActiveNote(null);
                setFavoriteActive(null);
              }}
              className="backdrop-blur-md"
            >
              <IoChevronBackOutline className="text-xl mr-2" />
              Go Back
            </Button>
          </div>
        </>
      )}
    </>
  );
};
