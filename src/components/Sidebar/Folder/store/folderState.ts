import { StateCreator } from 'zustand';
import {
  NameType,
  createFolderType,
  editFolderType,
  updateFolderType,
} from './folderStateType';
import { folderTypes } from '@/types';
export const createNameStore: StateCreator<NameType, [], [], NameType> = (
  set
) => ({
  name: 'My New Folder',
  setName: (name) =>
    set(() => ({
      name: name,
    })),
});

export const createFolderStore: StateCreator<
  createFolderType,
  [],
  [],
  createFolderType
> = (set) => ({
  toggleCreate: false,
  setToggleCreate: (status: boolean) =>
    set(() => ({
      toggleCreate: status,
    })),
});

export const editFolderStore: StateCreator<
  editFolderType,
  [],
  [],
  editFolderType
> = (set) => ({
  toggleEditFolder: false,
  setToggleEditFolder: (status: boolean) =>
    set(() => ({
      toggleEditFolder: status,
    })),
});
export const updateFolderStore: StateCreator<
  updateFolderType,
  [],
  [],
  updateFolderType
> = (set) => ({
  dataUpdate: {
    id: null,
    name: '',
  },
  setDataUpdate: (data: Partial<folderTypes>) =>
    set(() => ({
      dataUpdate: {
        id: data.id!,
        name: data.name!,
      },
    })),
});
