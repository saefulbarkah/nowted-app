import { FolderTypes } from '@/types';
import { create } from 'zustand';

interface StateFolder {
  name: string;
  isError: boolean;
  isCreateFolder: boolean;
  isEditFolder: boolean;
  isOpenDialogDelete: boolean;
}

interface StateData {
  deleteData: Pick<FolderTypes, 'id_folder' | 'name'>;
  updateData: Pick<FolderTypes, 'id_folder' | 'name'>;
}

interface ActionFolder {
  setName: (name: string) => void;
  setIsCreate: (status: boolean) => void;
  setIsEdit: (status: boolean) => void;
  setDialogDelete: (status: boolean) => void;
  setUpdateData: (data: Pick<FolderTypes, 'id_folder' | 'name'>) => void;
  setIsError: (status: boolean) => void;
}

export const useFolderStateStore = create<
  StateFolder & StateData & ActionFolder
>((set) => ({
  // init state
  name: 'New Folder',
  isError: false,
  isCreateFolder: false,
  isEditFolder: false,
  isOpenDialogDelete: false,

  // state data
  deleteData: {
    id_folder: '',
    name: '',
  },
  updateData: {
    id_folder: 0,
    name: '',
  },

  // action
  setName: (name) => {
    set((state) => {
      return { name: name };
    });
  },
  setIsCreate: (status) => {
    set(() => {
      return { isCreateFolder: status };
    });
  },
  setIsEdit: (status) => {
    set(() => {
      return { isEditFolder: status };
    });
  },
  setDialogDelete: (status) => {
    set(() => {
      return { isOpenDialogDelete: status };
    });
  },
  setUpdateData: (data) => {
    set(() => ({
      updateData: { id_folder: data.id_folder, name: data.name },
    }));
  },
  setIsError: (status) => {
    set(() => {
      return { isError: status };
    });
  },
}));
