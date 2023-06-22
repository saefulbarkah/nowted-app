import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { FolderTypes, NoteTypes } from '@/types';

const generateFolderId = uuid();

export const DEFAULT_NOTES: NoteTypes = {
  id_note: uuid(),
  name: 'lets making story',
  content: 'Our Story......',
  folder_id: generateFolderId,
};

export type folderStateType = {
  folders: FolderTypes[];
  addFolder: (data: Pick<FolderTypes, 'name'>) => void;
  updateFolder: (data: Pick<FolderTypes, 'id_folder' | 'name'>) => void;
  removeFolder: (data: Pick<FolderTypes, 'id_folder'>) => void;
};

export type noteStateType = {
  note?: NoteTypes;
  addNote: (data: { id_folder: string | null }) => void;
};

export const useNowtedStore = create<folderStateType & noteStateType>()(
  persist(
    (set) => ({
      folders: [
        {
          id_folder: generateFolderId,
          name: 'Personal',
          can_delete: false,
          notes: [DEFAULT_NOTES],
        },
      ],
      addFolder: (data) => {
        set((state) => {
          const folderId = uuid();
          return {
            folders: [
              {
                id_folder: folderId,
                name: data.name,
                can_delete: true,
                notes: [
                  {
                    ...DEFAULT_NOTES,
                    id_note: uuid(),
                    folder_id: folderId,
                  },
                ],
              },
              ...state.folders,
            ],
          };
        });
      },
      updateFolder: (data) => {
        set((state) => {
          return {
            folders: state.folders.map((item) =>
              item.id_folder === data.id_folder
                ? { ...item, name: data.name }
                : item
            ),
          };
        });
      },
      removeFolder: (data) => {
        set((state) => {
          return {
            folders: state.folders.filter(
              (item) => item.id_folder !== data.id_folder
            ),
          };
        });
      },
      addNote: (data) => {
        set((state) => {
          if (data.id_folder === null) {
            console.log('nothing ID');
            const filtered = state.folders.find(
              (item) => item.can_delete === false
            );
            if (filtered) {
              filtered.notes = [
                {
                  ...DEFAULT_NOTES,
                  name: 'New Notes',
                  id_note: uuid(),
                  folder_id: filtered.id_folder,
                },
                ...filtered.notes!,
              ];
            }
            return { folders: [...state.folders] };
          }
          const filtered = state.folders.find(
            (item) => item.id_folder === data.id_folder
          );
          if (filtered) {
            filtered.notes = [
              {
                ...DEFAULT_NOTES,
                name: 'New Notes',
                id_note: uuid(),
                folder_id: filtered.id_folder,
              },
              ...filtered.notes!,
            ];
          }
          return { folders: [...state.folders] };
        });
      },
    }),
    {
      name: 'folder-notes',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
