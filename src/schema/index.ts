import * as yup from 'yup';

interface notesSchema {
  id?: string;
  user_id?: string;
  folder_id?: string;
}
export const noteSchemaByid = yup.object<notesSchema>({
  id: yup.number().required(),
});

export const notesSchema = yup.object({
  user_id: yup.string().required(),
  folder_id: yup.number().required(),
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
  id: yup.number().required(),
});
export const updateFolderSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
});
