import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { FolderTypes, NoteTypes } from '@/types';
import { CONTENT } from '@/lib/note/CONST';

const generateFolderId = uuid();

export const DEFAULT_NOTES: NoteTypes = {
  id_note: uuid(),
  name: 'Reflection on the Month of June',
  content: CONTENT,
  folder_id: generateFolderId,
  createdAt: new Date(),
  deletedAt: null,
  favorite: false,
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
  saveNote: (data: Pick<NoteTypes, 'name' | 'folder_id' | 'id_note'>) => void;
  saveContent: (
    data: Pick<NoteTypes, 'content' | 'folder_id' | 'id_note'>
  ) => void;
  removeNote: (data: Pick<NoteTypes, 'id_note' | 'folder_id'>) => void;
  restoreNote: (data: Pick<NoteTypes, 'id_note' | 'folder_id'>) => void;
  addToFavorite: (data: Pick<NoteTypes, 'id_note' | 'folder_id'>) => void;
  removeFromFavorite: (data: Pick<NoteTypes, 'id_note' | 'folder_id'>) => void;
};

export const useNowtedStore = create<folderStateType & noteStateType>()(
  persist(
    (set) => ({
      folders: [],
      addFolder: (data) => {
        set((state) => {
          const folderId = uuid();
          return {
            folders: [
              {
                id_folder: folderId,
                name: data.name,
                notes: [
                  {
                    ...DEFAULT_NOTES,
                    content: CONTENT,
                    id_note: uuid(),
                    folder_id: folderId,
                    createdAt: new Date(),
                    folder_name: data.name,
                  },
                ],
                createdAt: new Date(),
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
          const filtered = state.folders.find(
            (item) => item.id_folder === data.id_folder
          );
          if (filtered) {
            filtered.notes = [
              {
                ...DEFAULT_NOTES,
                name: 'New Note',
                content: '',
                id_note: uuid(),
                folder_id: filtered.id_folder,
                createdAt: new Date(),
                deletedAt: null,
                folder_name: filtered.name,
              },
              ...filtered.notes!,
            ];
          }
          return { folders: [...state.folders] };
        });
      },
      saveNote: (data) => {
        set((state) => {
          if (!data.folder_id) return { folders: state.folders };
          const getFolder = state.folders.find(
            (item) => item.id_folder === data.folder_id
          ) as FolderTypes;
          if (getFolder) {
            const getNote = getFolder!.notes!.find(
              (item: NoteTypes) => item.id_note === data.id_note
            ) as NoteTypes;
            getNote.name = data.name as string;
          }
          return { folders: [...state.folders] };
        });
      },
      saveContent: (data) => {
        set((state) => {
          if (!data.folder_id) return { folders: state.folders };
          const getFolder = state.folders.find(
            (item) => item.id_folder === data.folder_id
          ) as FolderTypes;
          if (getFolder) {
            const getNote = getFolder!.notes!.find(
              (item: NoteTypes) => item.id_note === data.id_note
            ) as NoteTypes;
            getNote.content = data.content as string;
          }
          return { folders: [...state.folders] };
        });
      },
      removeNote: (data) => {
        set((state) => {
          const folders = state.folders.find(
            (item) => item.id_folder === data.folder_id
          );
          if (folders) {
            const notes = folders.notes;
            const note = notes?.find(
              (item: NoteTypes) => item.id_note === data.id_note
            ) as NoteTypes;
            note.deletedAt = new Date();
          }

          return { folders: [...state.folders] };
        });
      },
      restoreNote: (data) => {
        set((state) => {
          const folders = state.folders.find(
            (item) => item.id_folder === data.folder_id
          );
          if (folders) {
            const notes = folders.notes;
            const note = notes?.find(
              (item: NoteTypes) => item.id_note === data.id_note
            ) as NoteTypes;
            note.deletedAt = null;
          }
          return { folders: [...state.folders] };
        });
      },
      addToFavorite: (data) => {
        set((state) => {
          const folders = state.folders.find(
            (item) => item.id_folder === data.folder_id
          );
          if (folders) {
            const notes = folders.notes;
            const note = notes?.find(
              (item: NoteTypes) => item.id_note === data.id_note
            ) as NoteTypes;
            note.favorite = true;
          }

          return { folders: [...state.folders] };
        });
      },
      removeFromFavorite: (data) => {
        set((state) => {
          const folders = state.folders.find(
            (item) => item.id_folder === data.folder_id
          );
          if (folders) {
            const notes = folders.notes;
            const note = notes?.find(
              (item: NoteTypes) => item.id_note === data.id_note
            ) as NoteTypes;
            note.favorite = false;
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
