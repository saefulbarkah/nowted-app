import { folderTypes } from '@/types';

type localStateFolder = {
  name: string;
  toggleCreate: boolean;
  toggleEditFolder: boolean;
  dataUpdate: Pick<folderTypes, 'name' | 'id'>;
};

type localActionFolder = {
  setName: (name?: string) => void;
  setToggleCreate: (status: boolean) => void;
  setToggleEditFolder: (status: boolean) => void;
  setDataUpdate: (data: folderTypes) => void;
};

export type folderState = localStateFolder & localActionFolder;
export type NameType = Pick<folderState, 'name' | 'setName'>;
export type createFolderType = Pick<folderState, 'toggleCreate' | 'setToggleCreate'>;
export type editFolderType = Pick<folderState, 'toggleEditFolder' | 'setToggleEditFolder'>;
export type updateFolderType = Pick<folderState, 'dataUpdate' | 'setDataUpdate'>;
