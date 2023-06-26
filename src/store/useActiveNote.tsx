import { create } from 'zustand';

interface SProps {
  note_id: string;
  setActiveNote: (id: string) => void;
}

export const useActiveNote = create<SProps>((set) => ({
  note_id: '',
  setActiveNote: (id) => set(() => ({ note_id: id })),
}));
