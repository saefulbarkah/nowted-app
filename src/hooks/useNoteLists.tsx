import { getFolderFirst, getNotes } from '@/lib/api';
import { noteTypes } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { create } from 'zustand';

interface folderTitle {
  title: string;
  setTitle: (title: string) => void;
}
export const useFolderTitle = create<folderTitle>((set) => ({
  title: '',
  setTitle: (title: string) => {
    set(() => ({ title: title }));
  },
}));

interface UseNoteListsProps {
  user_id: string;
  folder_id?: string | null;
}

const useNoteLists = ({ folder_id, user_id }: UseNoteListsProps) => {
  const setTitle = useFolderTitle((state) => state.setTitle);
  const conditonalQuery = async () => {
    setTitle('');
    if (folder_id) {
      const data = (await getNotes({ folder_id, user_id })) as noteTypes[];
      setTitle(data[0].folder.name);
      return data;
    }
    const data = await getFolderFirst({ user_id });
    setTitle(data.name);
    return data.notes;
  };
  const {
    data: notes,
    isFetching: isNoteLoading,
    refetch,
  } = useQuery({
    queryKey: ['data'],
    queryFn: async () => await conditonalQuery(),
  });

  useEffect(() => {
    refetch();
  }, [folder_id]);
  return { notes, isNoteLoading };
};

export default useNoteLists;
