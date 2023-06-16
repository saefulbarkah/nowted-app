import { getFolderFirst } from '@/lib/api';
import { folderTypes, noteTypes } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useFolderTitle } from './useNoteLists';

interface folderFirst {
  user_id: string;
}

const useFolderFirst = ({
  user_id,
}: folderFirst): { notes: noteTypes; isNoteLoading: boolean } => {
  const setTitle = useFolderTitle((state) => state.setTitle);
  const { data: notes, isFetching: isNoteLoading } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const data = await getFolderFirst({ user_id });
      setTitle(data.name);
      return data.notes;
    },
  });
  return { notes, isNoteLoading };
};

export default useFolderFirst;
