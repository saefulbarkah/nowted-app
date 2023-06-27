'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import useNotes from '@/hooks/useNotes';
import { dateToString, toPlainText } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import { useActiveNote } from '@/store/useActiveNote';
import { FiInfo } from 'react-icons/fi';
import MenuLists from '../MenuLists';
import { LuFolderOpen } from 'react-icons/lu';

interface TProps {
  folder_id?: string;
}

const NoteLists = ({ folder_id }: TProps) => {
  const addToRecent = useRecentStore((state) => state.addToRecents);
  const { notes, title, loading } = useNotes({
    folder_id: folder_id as string,
  });
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const activeNote = useActiveNote((state) => state.activeNote);

  return (
    <MenuLists
      title={
        <div className="flex items-center">
          <LuFolderOpen className="mr-3 h-5 w-5" />
          <span>{title}</span>
        </div>
      }
    >
      {notes?.map((item, i) => (
        <Card
          className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer mb-5 last-of-type:mb-0 ${
            item.id_note === activeNote?.id_note
              ? 'bg-white/[7%] text-white'
              : 'text-white/[40%]'
          }`}
          key={i}
          onClick={() => {
            setActiveNote(item);
            addToRecent(item);
          }}
        >
          <CardContent className="p-[20px]">
            <h2 className="line-clamp-2 text-[18px] font-semibold leading-7 break-words">
              {item.name}
            </h2>
            <div className="flex gap-[10px] inactive-text mt-[10px]">
              <p className="font-normal">
                {dateToString({ values: item.createdAt })}
              </p>
              <p className="truncate font-normal">
                {toPlainText({ value: item.content as string, type: 'html' })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      {notes?.length === 0 && (
        <div className="h-[70vh] flex items-center justify-center flex-col gap-2">
          <FiInfo className="text-[24px] inactive-text" />
          <p className="inactive-text text-[20px]">Note is empty</p>
        </div>
      )}
    </MenuLists>
  );
};
export default NoteLists;
