'use client';
import { dateToString, htmlToPlainText, slug } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import Link from 'next/link';
import React, { Key } from 'react';
import { Card, CardContent } from '../ui/card';
import { noteTypes } from '@/types';
import { useSearchParams } from 'next/navigation';

function Lists({ notes }: { notes: noteTypes[] }) {
  const addToRecent = useRecentStore((state) => state.addToRecents);
  const note_id = useSearchParams().get('note_id');

  return (
    <>
      {notes?.length === 0 ? (
        <div className="min-h-[55vh] flex items-center justify-center">
          <p className="font-normal text-[18px]">please make a new note</p>
        </div>
      ) : (
        <>
          {notes?.map((item: any, i: Key) => (
            <Link
              href={`/note/${slug(item.name)}?folder=${slug(
                item.folder?.name
              )}&folder_id=${item.folder_id}&note_id=${item.id}`}
              key={i}
              onClick={() => addToRecent(item)}
            >
              <Card
                className={`border-none hover:bg-white/[7%] bg-white/[3%] transition cursor-pointer hover:text-white group ${
                  Number(note_id) === Number(item.id) && 'bg-white/[7%]'
                }`}
              >
                <CardContent className="p-[20px]">
                  <h2
                    className={`inactive-text line-clamp-2 text-[18px] font-medium leading-7 group-hover:text-white transition ${
                      Number(note_id) === Number(item.id) &&
                      'text-white font-semibold'
                    }`}
                  >
                    {item.name}
                  </h2>
                  <div className="flex gap-[10px] inactive-text mt-[10px]">
                    <p className="font-normal">
                      {dateToString({ values: item.created_at })}
                    </p>
                    <p className="truncate font-normal">
                      {htmlToPlainText({ html: item.content })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </>
      )}
    </>
  );
}

export default Lists;
