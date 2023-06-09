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
