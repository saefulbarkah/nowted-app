import * as yup from 'yup';

export const notesSchema = yup.object({
  user_id: yup.string().required(),
  folder_id: yup.string().required(),
});

// folders
export const folderSchema = yup.object({
  user_id: yup.string().required(),
});
export const createFolderSchema = yup.object({
  name: yup.string().required(),
  user_id: yup.string().required(),
});
export const deleteFolderSchema = yup.object({
  id: yup.string().required(),
});
export const updateFolderSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
});
