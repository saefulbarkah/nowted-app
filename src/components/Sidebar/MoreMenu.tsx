'use client';
import { FiStar, FiTrash } from 'react-icons/fi';
import Link from 'next/link';
import React from 'react';
import IndicatorCount from '../ui/IndicatorCount';
import useFavorites from '@/hooks/useFavorites';
import useTrash from '@/hooks/useTrash';
import { useSidebar } from '../Mobile/Sidebar';
import { useActiveNote } from '@/store/useActiveNote';
import { useFavoriteActive } from '../Favorites';

export type MoreType = {
  name: string;
  href: string;
  icon: JSX.Element;
  counter: number;
}[];

const MoreMenu: React.FC = () => {
  const setSidebar = useSidebar((state) => state.setOpen);
  const { favorites } = useFavorites();
  const { trash } = useTrash();
  const setFavoriteActive = useFavoriteActive(
    (state) => state.setFavoriteActive
  );
  const setActiveNote = useActiveNote((state) => state.setActiveNote);

  const more: MoreType = [
    {
      name: 'Favorites',
      href: '/favorites',
      icon: <FiStar />,
      counter: favorites?.length as number,
    },
    {
      name: 'Trash',
      href: '/trash',
      icon: <FiTrash />,
      counter: trash?.length as number,
    },
  ];
  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">More</p>
      </div>
      <div className="flex flex-col gap-[5px]">
        {more.map((item, i) => (
          <React.Fragment key={i}>
            <Link
              className="inactive-text hover:text-white py-[10px] hover:bg-white/[3%] transition px-[30px] rounded-md"
              href={'/app' + item.href}
              onClick={() => {
                setFavoriteActive(null);
                setActiveNote(null);
                setSidebar(false);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[15px]">
                  <div className="text-[20px]">{item.icon}</div>
                  <p className="truncate">{item.name}</p>
                </div>
                <IndicatorCount className="mr-2" count={item.counter} />
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MoreMenu;
