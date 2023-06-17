'use client';
import React, { FC, Fragment, Key } from 'react';
import { Card, CardContent } from '../ui/card';
import { usePathname, useSearchParams } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';
import { dateToString, htmlToPlainText, slug } from '@/lib/utils';
import { noteTypes } from '@/types';
import useNoteLists, { useFolderTitle } from '@/hooks/useNoteLists';
import { User } from 'next-auth';
import Link from 'next/link';

interface NoteListsProps {
  user: User;
}

const NoteLists: FC<NoteListsProps> = ({ user }) => {
  const searchParam = useSearchParams();
  const folder_id = searchParam.get('folder_id');
  const note_id = searchParam.get('note_id');
  const title = useFolderTitle((state) => state.title);

  const { notes, isNoteLoading } = useNoteLists({
    folder_id: folder_id,
    user_id: user!.id,
  });

  return (
    <>
      {isNoteLoading ? (
        <div>
          <Skeleton className="h-[40px] w-[50%]" />
        </div>
      ) : (
        <h2 className="text-[22px] font-semibold truncate">{title}</h2>
      )}
      <div className="flex flex-col pb-[30px] mt-[30px] gap-[20px]">
        {isNoteLoading ? (
          <>
            {Array(5)
              .fill(null)
              .map((item, i) => (
                <Skeleton className="h-[80px]" key={i} />
              ))}
          </>
        ) : (
          <>
            {notes?.length === 0 ? (
              <div className="min-h-[55vh] flex items-center justify-center">
                <p className="font-normal text-[18px]">
                  please make a new note
                </p>
              </div>
            ) : (
              <>
                {notes?.map((item: noteTypes, i: Key) => (
                  <Link
                    href={`/note/${slug(item.name)}?folder=${slug(
                      item.folder.name
                    )}&folder_id=${item.folder_id}&note_id=${item.id}`}
                    key={i}
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
        )}
      </div>
    </>
  );
};

export default NoteLists;
