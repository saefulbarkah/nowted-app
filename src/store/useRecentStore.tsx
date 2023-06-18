import { noteTypes } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface recentTypes {
  recents: noteTypes[];
  addToRecents: (data: any) => void;
}

export const useRecentStore = create<recentTypes>()(
  persist(
    (set) => ({
      recents: [],
      addToRecents: (data: noteTypes) => {
        set((state) => {
          return {
            recents: [
              data,
              ...state.recents
                .filter((item) => item.id !== data.id)
                .slice(0, 2),
            ],
          };
        });
      },
    }),
    {
      name: 'recents',
    }
  )
);
