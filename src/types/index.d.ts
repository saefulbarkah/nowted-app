export type NoteTypes = {
  id_note: string | number;
  name: string;
  content?: string;
  createdAt: null | Date;
  deletedAt: null | Date;
  folder_name?: string | null;
  folder_id: string | null;
};

export type FolderTypes = {
  id_folder: string | number;
  name: string;
  can_delete: boolean;
  notes: noteTypes[];
  createdAt?: null | Date;
};
