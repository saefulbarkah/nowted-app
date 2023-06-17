import { folderTypes } from '@/types';
import { create } from 'zustand';

export type folderStateType = {
  folders: folderTypes[];
  addFolder: (data: folderTypes) => void;
  editFolder: (data: folderTypes) => void;
  deleteFolder: (id: number) => void;
  setFolder: (data: any) => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
};

export const useFolder = create<folderStateType>()((set) => ({
  folders: [],
  isLoading: true,
  addFolder: (data: folderTypes) => {
    set((state) => {
      return {
        folders: [
          ...state.folders,
          {
            id: data.id,
            name: data.name,
            user_id: data.user_id,
            can_deleted: true,
          },
        ],
      };
    });
  },
  editFolder: (data: folderTypes) => {
    set((state) => {
      const findData = state.folders.find((item) => item.id === data.id);
      if (findData) {
        findData.name = data.name;
      }
      return {
        folders: [...state.folders],
      };
    });
  },
  deleteFolder: (id: number) => {
    set((state) => ({
      folders: state.folders.filter((item) => item.id !== id),
    }));
  },
  setFolder: (data: any) => set(() => ({ folders: data })),
  setIsLoading: (status: boolean) => set(() => ({ isLoading: status })),
}));
