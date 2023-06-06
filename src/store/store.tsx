import { create } from "zustand";
import { persist } from "zustand/middleware";

export type folderType = {
  id?: string | number;
  name: string;
};

export type folderStateType = {
  folders: {
    id: string | number;
    name: string;
  }[];
  addFolder: (data: folderType) => void;
};

export const useFolder = create<folderStateType>()(
  persist(
    (set) => ({
      folders: [],
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
                  id: 312313,
                  name: uniqueName,
                },
              ],
            };
          }
          return {
            folders: [
              ...state.folders,
              {
                id: 312313,
                name: data.name,
              },
            ],
          };
        });
      },
    }),
    {
      name: "folder-notes",
    }
  )
);
