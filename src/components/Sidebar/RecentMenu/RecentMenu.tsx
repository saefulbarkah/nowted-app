'use client';
import React from 'react';
import RecentLists from './RecentLists';

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
