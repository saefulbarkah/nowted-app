'use client';
import { create } from 'zustand';
import { dateToString, htmlToPlainText, slug } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import Link from 'next/link';
import React, { Key, useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { useSearchParams } from 'next/navigation';
import { User } from 'next-auth';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import { noteTypes } from '@/types';
import LoadingIcons from 'react-loading-icons';
import { Skeleton } from '../ui/skeleton';

interface folderTitle {
  title: string;
  setTitle: (title: string) => void;
}
export const useFolderTitle = create<folderTitle>((set) => ({
  title: '',
  setTitle: (title: string) => {
    set(() => ({ title: title }));
  },
}));

function Lists({ user }: { user: User }) {
  const addToRecent = useRecentStore((state) => state.addToRecents);
  const note_id = useSearchParams().get('note_id');
  const folder_id = useSearchParams().get('folder_id');
  const title = useFolderTitle((state) => state.title);
  const setTitle = useFolderTitle((state) => state.setTitle);

  const fetchNotes = async ({
    user_id,
    folder_id,
  }: {
    user_id: string;
    folder_id: number;
  }) => {
    if (!folder_id) {
      const notes = (await getNotes({ user_id })) as noteTypes[];
      setTitle(notes[0].folder.name);
      return notes;
    }
    const notes = (await getNotes({ user_id, folder_id })) as noteTypes[];
    setTitle(notes[0].folder.name);
    return notes;
  };

  const {
    data: notes,
    refetch: refetchNotes,
    isLoading,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: async () =>
      await fetchNotes({
        user_id: user.id,
        folder_id: Number(folder_id),
      }),
  });

  useEffect(() => {
    refetchNotes();
  }, [folder_id, refetchNotes]);

  return (
    <>
      <h2 className="text-[22px] font-semibold truncate">{title}</h2>
      <div className="flex flex-col pb-[30px] mt-[30px] gap-[20px]">
        {isLoading ? (
          <>
            {Array(5)
              .fill(null)
              .map((item, i) => (
                <Skeleton className="h-[80px]" key={i} />
              ))}
          </>
        ) : (
          notes?.map((item: any, i: Key) => (
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
                    className={`inactive-text line-clamp-2 text-[16px] font-semibold leading-7 group-hover:text-white transition ${
                      Number(note_id) === Number(item.id) && 'text-white'
                    }`}
                  >
                    {item.name}
                  </h2>
                  <div className="flex gap-[10px] inactive-text mt-[10px]">
                    <p className="font-normal text-[16px]">
                      {dateToString({ values: item.created_at })}
                    </p>
                    <p className="truncate font-normal text-[16px]">
                      {htmlToPlainText({ html: item.content })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

export default Lists;
