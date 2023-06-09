import { noteType } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
