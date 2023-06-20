export type NoteTypes = {
  id_note: string | number;
  name: string;
  content?: string;
};

export type FolderTypes = {
  id_folder: string | number;
  name: string;
  notes: noteTypes[] | null;
};
