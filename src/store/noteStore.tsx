import { noteType } from '@/types';
import { create } from 'zustand';

export type noteState = {
  notes: noteType[];
  saveNote?: (data: string | number | Date | boolean) => void;
};

export const useNotes = create<noteState>((set) => ({
  notes: [],
}));
