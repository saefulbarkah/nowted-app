export type noteType = {
  id: string | number;
  title: string;
  date: Date;
  content: string;
  folderId?: number | null;
  isFavorites?: boolean;
  isOnTrash?: boolean;
  isOnArchived?: boolean;
};

export interface folderTypes {
  id?: string;
  name: string;
  user_id: string;
  can_deleted?: boolean | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
