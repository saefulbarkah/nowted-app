'use client';
import Image from 'next/image';
import React from 'react';
import FolderMenu from './FolderMenu/FolderMenu';
import MoreMenu from './MoreMenu';
import SearchNote from './SearchNote';
import RecentMenu from './RecentMenu/RecentMenu';
import CreateNote from './CreateNote';

const Sidebar: React.FC = () => {
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
        <CreateNote />
        <RecentMenu />
        <FolderMenu />
        <MoreMenu />
      </div>
    </div>
  );
};

export default Sidebar;
