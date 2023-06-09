import { create } from "zustand";
import { persist } from "zustand/middleware";

export type noteType = {
  id: string | number;
  title: string;
  date: Date;
  content: string;
  folder_id?: number | null;
  is_favorites?: boolean;
  is_on_trash?: boolean;
  is_on_archived_notes?: boolean;
};

export type noteState = {
  notes: noteType[];
  saveNote?: (data: string | number | Date | boolean) => void;
};

export const useNotes = create<noteState>()(
  persist(
    (set) => ({
      notes: [],
    }),
    {
      name: "notes",
    }
  )
);
