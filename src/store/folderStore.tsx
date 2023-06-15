import { folderTypes } from '@/types';
import { create } from 'zustand';

export type folderStateType = {
  folders: folderTypes[];
  addFolder: (data: folderTypes) => void;
  editFolder: (data: folderTypes) => void;
  deleteFolder: (id: string) => void;
  setFolder: (data: any) => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
};

export const useFolder = create<folderStateType>()((set) => ({
  folders: [],
  isLoading: true,
  addFolder: (data: folderTypes) => {
    set((state) => {
      const filterName = state.folders.filter((item) => item.name.includes(data.name));
      const existingName = filterName[filterName.length - 1];
      if (existingName) {
        let uniqueName = `${data.name}_copy`;
        const randomizeNumber = Math.floor(Math.random() * 1000);
        if (existingName.name.includes(uniqueName)) {
          uniqueName = `${data.name}_copy ${randomizeNumber}`;
        }
        return {
          folders: [
            ...state.folders,
            {
              id: data.id,
              name: uniqueName,
              user_id: data.user_id,
              can_deleted: true,
            },
          ],
        };
      }
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
  deleteFolder: (id: string) => {
    set((state) => ({
      folders: state.folders.filter((item) => item.id !== id),
    }));
  },
  setFolder: (data: any) => set(() => ({ folders: data })),
  setIsLoading: (status: boolean) => set(() => ({ isLoading: status })),
}));
