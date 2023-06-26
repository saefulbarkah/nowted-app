import { NoteTypes } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface recentTypes {
  recents: NoteTypes[];
  addToRecents: (data: any) => void;
  removeRecents: (data: Pick<NoteTypes, 'id_note'>) => void;
  updateTitleRecent: (data: Partial<NoteTypes>) => void;
}

export const useRecentStore = create<recentTypes>()(
  persist(
    (set) => ({
      recents: [],
      addToRecents: (data: NoteTypes) => {
        set((state) => {
          const existsRecents = state.recents.some(
            (item) => item.id_note === data.id_note
          );
          if (existsRecents) return { recents: state.recents };
          return {
            recents: [
              data,
              ...state.recents
                .filter((item) => item.id_note !== data.id_note)
                .slice(0, 2),
            ],
          };
        });
      },
      removeRecents: (data) => {
        set((state) => ({
          recents: state.recents.filter(
            (item) => item.id_note !== data.id_note
          ),
        }));
      },
      updateTitleRecent: (data) => {
        set((state) => {
          const findRecent = state.recents.find(
            (item) => item.id_note === data.id_note
          );
          if (findRecent) {
            findRecent.name = data.name as string;
          }
          return {
            recents: [...state.recents],
          };
        });
      },
    }),
    {
      name: 'recents',
    }
  )
);
