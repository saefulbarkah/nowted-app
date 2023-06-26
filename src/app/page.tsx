import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { FolderOpen } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Nowted',
};
function page() {
  return (
    <>
      <div className="flex flex-col gap-[10px] items-center justify-center h-screen border w-full">
        <FolderOpen className="h-[50px] w-[50px]" />
        <h2 className="font-semibold text-[28px]">
          Select Folder to view note list
        </h2>
        <p className="w-[460px] text-center font-normal text-white/[60%]">
          Choose a folder from the menu on the left to view its notes, or create
          a new folder to add to your collection.
        </p>
      </div>
    </>
  );
}

export default page;
