'use client';
import { slug } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FiFileText } from 'react-icons/fi';

function RecentLists() {
  const recents = useRecentStore((state) => state.recents);
  const searchParams = useSearchParams();
  const get_note_id = searchParams.get('note_id');
  return (
    <>
      {recents?.map((item, i) => (
        <React.Fragment key={i}>
          <Link
            className={`flex items-center py-[10px] space-x-[15px] inactive-text hover:text-white hover:bg-white/[3%] transition-colors px-[30px] ${
              get_note_id === item.id_note &&
              'bg-primary text-white hover:bg-primary/70'
            }`}
            href={`/note/${slug(item.name)}?folder=${slug(
              item.folder_name!
            )}&folder_id=${item.folder_id}&note_id=${item.id_note}`}
          >
            <div>
              <FiFileText className="text-[20px]" />
            </div>
            <p className="truncate text-[16px]">{item.name}</p>
          </Link>
        </React.Fragment>
      ))}
    </>
  );
}

export default RecentLists;
