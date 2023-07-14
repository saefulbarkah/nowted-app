'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import useNotes from '@/hooks/useNotes';
import { dateToString, toPlainText } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import { useActiveNote } from '@/store/useActiveNote';
import { AiFillFolderOpen, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import MenuLists from '../MenuLists';
import EmptyInfo from '../EmptyInfo';

interface TProps {
  folder_id: string;
}

export const NoteLists = ({ folder_id }: TProps) => {
  const addToRecent = useRecentStore((state) => state.addToRecents);
  const { notes, title, loading } = useNotes({
    folder_id: folder_id as string,
  });
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const activeNote = useActiveNote((state) => state.activeNote);

  return (
    <MenuLists
      title={
        <div className="flex items-center max-w-full">
          <AiFillFolderOpen className="mr-3 h-6 w-6 text-orange-300" />
          <p className="truncate">{title}</p>
        </div>
      }
    >
      {notes?.map((item, i) => (
        <Card
          className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer mb-5 last-of-type:mb-0 rounded-sm ${
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
          <CardContent className="p-[20px] relative">
            <h2 className="line-clamp-2 text-[18px] font-semibold leading-7 break-words">
              {item.name}
            </h2>
            <div className="flex inactive-text mt-[10px] items-center max-w-full">
              {item.favorite && (
                <AiFillStar className="text-yellow-500 text-sm mr-1" />
              )}
              {!item.favorite && (
                <AiOutlineStar className="text-white text-sm mr-1" />
              )}
              <p className="font-normal mr-2">
                {dateToString({ values: item.createdAt })}
              </p>
              <p className="truncate font-normal flex-1">
                {toPlainText({ value: item.content as string, type: 'html' })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      <EmptyInfo title="Note is empty" data={notes as []} />
    </MenuLists>
  );
};
