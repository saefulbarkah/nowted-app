'use client';
import React, { FC } from 'react';
import MenuLists from '../MenuLists';
import useFavorites from '@/hooks/useFavorites';
import { Card, CardContent } from '../ui/card';
import { NoteTypes } from '@/types';
import { create } from 'zustand';
import { dateToString, toPlainText } from '@/lib/utils';
import EmptyInfo from '../EmptyInfo';
import { AiFillStar } from 'react-icons/ai';
import { useRecentStore } from '@/store/useRecentStore';

interface FavoriteListsProps {}

interface SProps {
  favoriteActive: NoteTypes | null;
  setFavoriteActive: (data: any) => void;
}

export const useFavoriteActive = create<SProps>((set) => ({
  favoriteActive: null,
  setFavoriteActive: (data) => set(() => ({ favoriteActive: data })),
}));

export const FavoriteLists: FC<FavoriteListsProps> = ({}) => {
  const { favorites } = useFavorites();
  const favoriteActive = useFavoriteActive((state) => state.favoriteActive);
  const setFavoriteActive = useFavoriteActive(
    (state) => state.setFavoriteActive
  );
  const addToRecent = useRecentStore((state) => state.addToRecents);

  return (
    <MenuLists
      title={
        <div className="flex items-center max-w-full">
          <AiFillStar className="mr-3 h-6 w-6 text-yellow-500" />
          <span>Favorites</span>
        </div>
      }
    >
      {favorites?.map((item, i) => (
        <Card
          className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer mb-5 last-of-type:mb-0 ${
            item.id_note === favoriteActive?.id_note
              ? 'bg-white/[7%] text-white'
              : 'text-white/[40%]'
          }`}
          key={i}
          onClick={() => {
            setFavoriteActive(item);
            addToRecent(item);
          }}
        >
          <CardContent className="p-[20px]">
            <h2 className="line-clamp-2 text-[18px] font-semibold leading-7">
              {item.name}
            </h2>
            <div className="flex gap-[10px] inactive-text mt-[10px]">
              <p className="font-normal">
                {dateToString({ values: item.createdAt })}
              </p>
              <p className="truncate font-normal">
                {toPlainText({ value: item.content as string, type: 'html' })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      <EmptyInfo title="Favorite is empty" data={favorites as []} />
    </MenuLists>
  );
};
