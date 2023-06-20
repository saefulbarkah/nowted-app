import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { FolderTypes, NoteTypes } from '@/types';

export const DEFAULT_NOTES: NoteTypes = {
  id_note: uuid(),
  name: 'lets making story',
  content: 'Our Story......',
};

export type folderStateType = {
  folders?: FolderTypes[];
  addFolder?: (data: FolderTypes) => void;
  editFolder?: (editData: Partial<FolderTypes>) => void;
  deleteFolder?: (data: Partial<FolderTypes>) => void;
};

export const useFolder = create<folderStateType>()(
  persist(
    (set) => ({
      folders: [
        {
          id_folder: uuid(),
          name: 'Personal',
          notes: [DEFAULT_NOTES],
        },
      ],
    }),
    {
      name: 'folder-notes',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
