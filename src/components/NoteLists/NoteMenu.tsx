'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { useSearchParams } from 'next/navigation';
import useNotes from '@/hooks/useNotes';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { dateToString, slug, toPlainText } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import { FiInfo } from 'react-icons/fi';

const NoteMenu = () => {
  const addToRecent = useRecentStore((state) => state.addToRecents);
  const searchParams = useSearchParams();
  const getFolderId = searchParams.get('folder_id');
  const currentNoteId = searchParams.get('note_id');
  const { notes, loading, title } = useNotes({ folder_id: getFolderId });

  return (
    <div className="fixed top-0 left-0 bottom-0 ml-[305px] w-[350px] custom-scrollbar bg-foreColor/80">
      {loading ? (
        <>
          <div className="px-[20px]">
            <Skeleton className="h-[40px] w-[200px] mt-[30px]" />
          </div>
          <div className="flex flex-col h-full  px-[20px]">
            <div className="flex flex-col pb-[30px] mt-[30px] gap-[20px]">
              {Array(5)
                .fill(null)
                .map((item, i) => (
                  <React.Fragment key={i}>
                    <Skeleton className="h-[100px] w-full" />
                  </React.Fragment>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full py-[30px] px-[20px]">
          <h2 className="text-[22px] font-semibold">{title}</h2>
          <div className="flex flex-col pb-[30px] mt-[30px] gap-[20px]">
            {notes?.map((item, i) => (
              <Link
                href={`/note/${slug(item.name)}?note_id=${
                  item.id_note
                }&folder_id=${item.folder_id}`}
                key={i}
                onClick={() => addToRecent(item)}
              >
                <Card
                  className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer ${
                    item.id_note === currentNoteId
                      ? 'bg-white/[7%] text-white'
                      : 'text-white/[40%]'
                  }`}
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
              </Link>
            ))}
          </div>
          {notes?.length === 0 && (
            <div className="h-[70vh] flex items-center justify-center flex-col gap-2">
              <FiInfo className="text-[30px] inactive-text" />
              <p className="inactive-text text-[20px]">Note is empty</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default NoteMenu;
