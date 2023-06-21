'use client';
import Image from 'next/image';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Button } from '../ui/button';
import FolderMenu from './FolderMenu/FolderMenu';
import RecentMenu from './RecentMenu';
import MoreMenu from './MoreMenu';
import SearchNote from './SearchNote';
import { useSearchParams } from 'next/navigation';
import { useNowtedStore } from '@/store';

export const Sidebar: React.FC = () => {
  const addNote = useNowtedStore((state) => state.addNote);
  const searchParams = useSearchParams();
  const folder_id = searchParams.get('folder_id');
  return (
    <div className="fixed left-0 bottom-0 top-0 w-[300px] custom-scrollbar">
      <div className="flex flex-col gap-[30px] my-[30px]">
        <div className="flex justify-between items-center px-[20px]">
          <div className="relative h-[38px] w-[100px]">
            <Image
              alt="test"
              fill
              src={'/logo.svg'}
              priority
              className="object-contain w-full"
            />
          </div>
          <SearchNote />
        </div>
        <div className="px-[20px]">
          <Button
            className="w-full text-[16px] font-semibold flex gap-2"
            size={'lg'}
            variant={'secondary'}
            onClick={() => addNote({ id_folder: folder_id })}
          >
            <FiPlus className="text-[20px]" /> <span>New Note</span>
          </Button>
        </div>
        <RecentMenu />
        <FolderMenu />
        <MoreMenu />
      </div>
    </div>
  );
};
