'use client';
import React, { FC } from 'react';
import MenuLists from '../MenuLists';
import { Card, CardContent } from '../ui/card';
import { dateToString, toPlainText } from '@/lib/utils';
import useTrash from '@/hooks/useTrash';
import { FiInfo, FiTrash } from 'react-icons/fi';
import { useTrashActive } from './TrashMenu';
import EmptyInfo from '../EmptyInfo';
import { AiFillDelete } from 'react-icons/ai';

interface TrashListsProps {}

const TrashLists: FC<TrashListsProps> = ({}) => {
  const trashActive = useTrashActive((state) => state.trashActive);
  const setTrashActive = useTrashActive((state) => state.setTrashActive);
  const { trash } = useTrash();
  return (
    <MenuLists
      title={
        <div className="flex items-center">
          <AiFillDelete className="text-rose-400 mr-3 h-6 w-6" />
          <p>Trash</p>
        </div>
      }
    >
      {trash?.map((item, i) => (
        <Card
          className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer mb-5 last-of-type:mb-0 ${
            item.id_note === trashActive?.id_note
              ? 'bg-white/[7%] text-white'
              : 'text-white/[40%]'
          }`}
          key={i}
          onClick={() => {
            setTrashActive(item);
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
                {toPlainText({ value: item.content as string, type: 'html' })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      <EmptyInfo title="Trash is empty" data={trash as []} />
    </MenuLists>
  );
};

export default TrashLists;
