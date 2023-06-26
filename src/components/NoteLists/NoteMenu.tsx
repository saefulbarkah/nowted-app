'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import useNotes from '@/hooks/useNotes';
import Link from 'next/link';
import { dateToString, slug, toPlainText } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import { useActiveNote } from '@/store/useActiveNote';
import { FiInfo } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface TProps {
  folder_id?: string;
}

const NoteMenu = ({ folder_id }: TProps) => {
  const addToRecent = useRecentStore((state) => state.addToRecents);
  const { notes, title, loading } = useNotes({
    folder_id: folder_id as string,
  });
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const activeNoteId = useActiveNote((state) => state.note_id);

  return (
    <div className="overflow-y-auto w-[350px] h-screen bg-acent-2 px-5 pb-[23px]">
      {loading ? (
        <>
          <div className="h-24 flex items-center">
            <Skeleton className="h-[35px] w-[200px]" />
          </div>
          {Array(3)
            .fill(null)
            .map((item, i) => (
              <React.Fragment key={i}>
                <Skeleton className="h-[100px] w-full mb-5 last-of-type:mb-0" />
              </React.Fragment>
            ))}
        </>
      ) : (
        <>
          <div className="sticky top-0 h-24 flex items-center bg-acent-2">
            <h2 className="text-[22px] font-semibold">{title}</h2>
          </div>
          {notes.map((item, i) => (
            <Card
              className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer mb-5 last-of-type:mb-0 ${
                item.id_note === activeNoteId
                  ? 'bg-white/[7%] text-white'
                  : 'text-white/[40%]'
              }`}
              key={i}
              onClick={() => {
                setActiveNote(item.id_note);
                addToRecent(item);
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
        </>
      )}
      {notes?.length === 0 && !loading && (
        <div className="h-[70vh] flex items-center justify-center flex-col gap-2">
          <FiInfo className="text-[30px] inactive-text" />
          <p className="inactive-text text-[20px]">Note is empty</p>
        </div>
      )}
    </div>
  );
};
export default NoteMenu;
