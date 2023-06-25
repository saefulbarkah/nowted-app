'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const RecentLists = dynamic(() => import('./RecentLists'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-[15px] h-[100px] items-center justify-center">
      <div className="flex items-center px-[30px] justify-center">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  ),
});

const RecentMenu: React.FC = () => {
  return (
    <div className="flex flex-col space-y-[8px]">
      <p className="text-[14px] font-semibold inactive-text px-[30px]">
        Recents
      </p>
      <div className="flex flex-col gap-[5px]">
        <RecentLists />
      </div>
    </div>
  );
};
export default RecentMenu;
