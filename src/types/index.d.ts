export type noteTypes = {
  id: string;
  name: string;
  content?: string | null;
  user_id: string;
  folder_id: string;
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};

export interface folderTypes {
  id?: string;
  name: string;
  user_id?: string;
  can_deleted?: boolean | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
