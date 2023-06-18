import { noteTypes } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface recentTypes {
  recents: noteTypes[];
  addToRecents: (data: any) => void;
  removeRecents: ({ id }: { id: number }) => void;
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
      removeRecents: ({ id }: { id: number }) => {
        set((state) => ({
          recents: state.recents.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: 'recents',
    }
  )
);
