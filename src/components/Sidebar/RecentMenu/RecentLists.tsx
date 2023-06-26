'use client';
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
  const activeNoteId = useActiveNote((state) => state.note_id);
  return (
    <>
      {recents?.map((item, i) => (
        <React.Fragment key={i}>
          <Link
            className={`flex items-center py-[10px] space-x-[15px] inactive-text hover:text-white hover:bg-white/[3%] transition-colors px-[30px] ${
              folderId &&
              activeNoteId === item.id_note &&
              'bg-primary text-white hover:bg-primary/70'
            }`}
            onClick={() => setActiveNote(item.id_note)}
            href={`/folders/${item.folder_id}`}
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
