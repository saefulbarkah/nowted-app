'use client';
import React, { FC } from 'react';
import MenuLists from '../MenuLists';
import { Card, CardContent } from '../ui/card';
import { dateToString, toPlainText } from '@/lib/utils';
import useTrash from '@/hooks/useTrash';
import { useActiveNote } from '@/store/useActiveNote';
import { FiInfo } from 'react-icons/fi';

interface TrashListsProps {}

const TrashLists: FC<TrashListsProps> = ({}) => {
  const activeNote = useActiveNote((state) => state.activeNote);
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const { trash } = useTrash();
  return (
    <MenuLists title="Trash">
      {trash?.map((item, i) => (
        <Card
          className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer mb-5 last-of-type:mb-0 ${
            item.id_note === activeNote?.id_note
              ? 'bg-white/[7%] text-white'
              : 'text-white/[40%]'
          }`}
          key={i}
          onClick={() => {
            setActiveNote(item);
          }}
        >
          <CardContent className="p-[20px]">
            <h2 className="line-clamp-2 text-[18px] font-semibold leading-7">
              {item.name}
            </h2>
            <div className="flex gap-[10px] inactive-text mt-[10px]">
              <p className="font-normal">
                {dateToString({ values: item.createdAt })}
              </p>
              <p className="truncate font-normal">
                {toPlainText({ value: item.content, type: 'html' })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      {trash?.length === 0 && (
        <div className="h-[70vh] flex items-center justify-center flex-col gap-2">
          <FiInfo className="text-[24px] inactive-text" />
          <p className="inactive-text text-[20px]">Note is empty</p>
        </div>
      )}
    </MenuLists>
  );
};

export default TrashLists;
