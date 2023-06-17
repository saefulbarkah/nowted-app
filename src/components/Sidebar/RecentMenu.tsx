'use client';
import { slug } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FiFileText } from 'react-icons/fi';

const RecentMenu: React.FC = () => {
  const recents = useRecentStore((state) => state.recents);
  const searchParams = useSearchParams();
  const get_note_id = searchParams.get('note_id');
  return (
    <div className="flex flex-col space-y-[8px]">
      <p className="text-[14px] font-semibold inactive-text px-[30px]">
        Recents
      </p>
      <div className="flex flex-col gap-[5px]">
        {recents?.map((item, i) => (
          <React.Fragment key={i}>
            <Link
              className={`flex items-center py-[10px] space-x-[15px] inactive-text hover:text-white hover:bg-white/[3%] transition-colors px-[30px] rounded-md ${
                Number(get_note_id) === Number(item.id) &&
                'bg-primary text-white'
              }`}
              href={`/note/${slug(item.name)}?folder=${slug(
                item.folder.name
              )}&folder_id=${item.folder_id}&note_id=${item.id}`}
            >
              <div>
                <FiFileText className="text-[20px]" />
              </div>
              <p className="truncate text-[16px]">{item.name}</p>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default RecentMenu;
