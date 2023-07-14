'use client';
import { Divide } from 'hamburger-react';
import Image from 'next/image';
import React from 'react';
import { useSidebar } from '../Sidebar';

export const HeaderMobile = ({ children }: React.PropsWithChildren) => {
  const toggleSidebar = useSidebar((state) => state.toggleSidebar);
  const isOpenSidebar = useSidebar((state) => state.open);
  return (
    <div className="lg:hidden block sticky top-0 w-full z-50 bg-background h-[60px]">
      <div className="flex justify-between items-center relative h-full px-[20px]">
        <div className={`h-[38px] w-[100px] relative`}>
          <Image
            alt="test"
            fill
            src={'/logo.svg'}
            priority
            className="object-contain w-full"
          />
        </div>
        <button
          onClick={() => toggleSidebar()}
          className="absolute right-0 z-[9999]"
        >
          <Divide toggled={isOpenSidebar} size={20} />
        </button>
      </div>
      {children}
    </div>
  );
};
