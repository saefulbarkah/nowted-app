'use client';
import { useSidebar } from '@/components/Mobile/Sidebar';
import { useActiveNote } from '@/store/useActiveNote';
import { useRecentStore } from '@/store/useRecentStore';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { FiFileText } from 'react-icons/fi';

function RecentLists() {
  const recents = useRecentStore((state) => state.recents);
  const params = useParams();
  const { folderId } = params;
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const activeNote = useActiveNote((state) => state.activeNote);
  const setSidebar = useSidebar((state) => state.setOpen);
  return (
    <>
      {recents?.map((item, i) => (
        <React.Fragment key={i}>
          <Link
            className={`flex items-center py-[10px] space-x-[15px] inactive-text hover:text-white hover:bg-white/[3%] transition-colors px-[30px] ${
              folderId &&
              activeNote?.id_note === item.id_note &&
              'bg-primary text-white hover:bg-primary/70'
            }`}
            onClick={() => {
              setActiveNote(item);
              setSidebar(false);
            }}
            href={`/app/folders/${item.folder_id}`}
          >
            <div>
              <FiFileText className="text-[20px]" />
            </div>
            <p className="truncate text-[16px]">{item.name}</p>
          </Link>
        </React.Fragment>
      ))}
      {recents.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="px-[30px] text-sm inactive-text">No recents</p>
        </div>
      )}
    </>
  );
}

export default RecentLists;
