import { NoteTypes } from '@/types';
import { create } from 'zustand';

interface SProps {
  activeNote: NoteTypes | null;
  setActiveNote: (data: any) => void;
}

export const useActiveNote = create<SProps>((set) => ({
  activeNote: null,
  setActiveNote: (data) => set(() => ({ activeNote: data })),
}));
