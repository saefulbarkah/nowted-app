import { StateCreator } from 'zustand';
import { NameType, createFolderType, editFolderType, updateFolderType } from './folderStateType';
import { folderTypes } from '@/types';
export const createNameStore: StateCreator<NameType, [], [], NameType> = (set) => ({
  name: 'My New Folder',
  setName: (name) =>
    set(() => ({
      name: name,
    })),
});

export const createFolderStore: StateCreator<createFolderType, [], [], createFolderType> = (
  set
) => ({
  createFolder: false,
  setCreateFolder: (status: boolean) =>
    set(() => ({
      createFolder: status,
    })),
});

export const editFolderStore: StateCreator<editFolderType, [], [], editFolderType> = (set) => ({
  editFolder: false,
  setEditFolder: (status: boolean) =>
    set(() => ({
      editFolder: status,
    })),
});
export const updateFolderStore: StateCreator<updateFolderType, [], [], updateFolderType> = (
  set
) => ({
  dataUpdate: {
    id: '',
    name: '',
  },
  setDataUpdate: (data: folderTypes) =>
    set(() => ({
      dataUpdate: {
        id: data.id,
        name: data.name,
      },
    })),
});
