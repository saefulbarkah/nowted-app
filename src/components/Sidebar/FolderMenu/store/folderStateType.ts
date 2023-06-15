import { folderType } from '@/store';

type localStateFolder = {
   name: string;
   createFolder: boolean;
   editFolder: boolean;
   dataUpdate: folderType;
};

type localActionFolder = {
   setName: (name: string) => void;
   setCreateFolder: (status: boolean) => void;
   setEditFolder: (status: boolean) => void;
   setDataUpdate: (data: folderType) => void;
};

export type folderState = localStateFolder & localActionFolder;
export type NameType = Pick<folderState, 'name' | 'setName'>;
export type createFolderType = Pick<folderState, 'createFolder' | 'setCreateFolder'>;
export type editFolderType = Pick<folderState, 'editFolder' | 'setEditFolder'>;
export type updateFolderType = Pick<folderState, 'dataUpdate' | 'setDataUpdate'>;
