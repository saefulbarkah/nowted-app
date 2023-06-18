export type noteTypes = {
  id: number;
  name: string;
  content?: string | null;
  user_id: string;
  folder_id: number;
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  folder: folderTypes;
};

export interface folderTypes {
  id: number;
  name: string;
  user_id?: string;
  can_deleted?: boolean | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  notes?: noteTypes[];
}
