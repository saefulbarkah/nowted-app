import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import { noteType } from "./noteStore";

export type folderType = {
  id?: string | number;
  name: string;
  notes_lists?: noteType[] | null;
};

export type folderStateType = {
  folders: {
    id: string | number;
    name: string;
    can_delete?: boolean;
  }[];
  addFolder: (data: folderType) => void;
  editFolder: (editData: folderType) => void;
  deleteFolder: (id: string | number) => void;
};

export const useFolder = create<folderStateType>()((set) => ({
  folders: [
    {
      id: uuid(),
      name: "My folder",
      notes_lists: null,
      can_delete: false,
    },
  ],
  addFolder: (data: folderType) => {
    set((state) => {
      const filterName = state.folders.filter((item) =>
        item.name.includes(data.name)
      );
      const existingName = filterName[filterName.length - 1];
      if (existingName) {
        let uniqueName = `${data.name}_copy`;
        const ranomizeNumber = Math.floor(Math.random() * 1000);
        if (existingName.name.includes(uniqueName)) {
          uniqueName = `${data.name}_copy ${ranomizeNumber}`;
        }
        return {
          folders: [
            ...state.folders,
            {
              id: uuid(),
              name: uniqueName,
            },
          ],
        };
      }
      return {
        folders: [
          ...state.folders,
          {
            id: uuid(),
            name: data.name,
          },
        ],
      };
    });
  },
  editFolder: (data: folderType) => {
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
  deleteFolder: (id: string | number) => {
    set((state) => ({
      folders: state.folders.filter((item) => item.id !== id),
    }));
  },
}));
