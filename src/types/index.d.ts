export type NoteTypes = {
  id_note: string | number;
  name: string;
  content?: string;
  createdAt: null | Date;
  folder_id: string | null;
};

export type FolderTypes = {
  id_folder: string | number;
  name: string;
  can_delete: boolean;
  notes: noteTypes[] | null;
  createdAt?: null | Date;
};
