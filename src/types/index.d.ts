export type NoteTypes = {
  id_note: string;
  name: string;
  content?: string;
  createdAt: null | Date;
  deletedAt: null | Date;
  folder_name?: string | null;
  folder_id: string | null;
};

export type FolderTypes = {
  id_folder: string;
  name: string;
  can_delete: boolean;
  notes: noteTypes[];
  createdAt?: null | Date;
};
