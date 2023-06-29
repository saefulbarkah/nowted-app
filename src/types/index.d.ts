export type NoteTypes = {
  id_note: string;
  name: string;
  content?: string;
  createdAt: null | Date;
  deletedAt: null | Date;
  folder_name?: string | null;
  folder_id: string | null;
  favorite: boolean;
};

export type FolderTypes = {
  id_folder: string;
  name: string;
  notes: noteTypes[];
  createdAt?: null | Date;
};
