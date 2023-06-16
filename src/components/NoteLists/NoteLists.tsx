'use client';
import React, { FC, Key, useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { useSearchParams } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { Skeleton } from '../ui/skeleton';
import { dateToString, htmlToPlainText } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getFolderFirst, getNotes } from '@/lib/api';
import { noteTypes } from '@/types';
import useNoteLists from '@/hooks/useNoteLists';

interface NoteListsProps {
  user: User | null;
}

const NoteLists: FC<NoteListsProps> = ({ user }) => {
  const searchParam = useSearchParams();
  const folder_id = searchParam.get('folder_id');

  const { notes, isNoteLoading } = useNoteLists({
    folder_id: folder_id,
    user_id: user!.id,
  });

  return (
    <div className="flex flex-col pb-[30px] mt-[30px] gap-[20px]">
      {isNoteLoading ? (
        <>
          {Array(10)
            .fill(null)
            .map((item, i) => (
              <Skeleton className="h-[80px]" key={i} />
            ))}
        </>
      ) : (
        <>
          {notes?.length === 0 ? (
            <div className="min-h-[55vh] flex items-center justify-center">
              <p className="font-normal text-[18px]">please make a new note</p>
            </div>
          ) : (
            <>
              {notes?.map((item: noteTypes, i: Key) => (
                <Card
                  className="bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer"
                  key={i}
                >
                  <CardContent className="p-[20px]">
                    <h2 className="text-white line-clamp-2 text-[18px] font-semibold leading-7">
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
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NoteLists;
