'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { useSearchParams } from 'next/navigation';
import useNotes from '@/hooks/useNotes';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { slug } from '@/lib/utils';

const NoteMenu = () => {
  const searchParams = useSearchParams();
  const getFolderId = searchParams.get('folder_id');
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
                  <>
                    <Skeleton className="h-[100px] w-full" />
                  </>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full my-[30px] px-[20px]">
          <h2 className="text-[22px] font-semibold">{title}</h2>
          <div className="flex flex-col pb-[30px] mt-[30px] gap-[20px]">
            {notes?.map((item, i) => (
              <Link
                href={`/note/${slug(item.name)}?note_id=${
                  item.id_note
                }&folder_id=${item.folder_id}`}
                key={i}
              >
                <Card className="bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer">
                  <CardContent className="p-[20px]">
                    <h2 className="text-white line-clamp-2 text-[18px] font-semibold leading-7">
                      My Favorite Memories from Childhood
                    </h2>
                    <div className="flex gap-[10px] inactive-text mt-[10px]">
                      <p className="font-normal">31/12/2022</p>
                      <p className="truncate font-normal">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Laudantium suscipit molestiae quo eos culpa
                        assumenda excepturi id nam nobis veniam, adipisci dicta
                        odit ab quos ullam molestias cupiditate aut repellat!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default NoteMenu;
