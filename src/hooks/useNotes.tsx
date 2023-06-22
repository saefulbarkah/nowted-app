'use client';
import { NoteTypes } from '@/types';
import { useEffect, useState } from 'react';
import useFolderState from './useFolderState';
import { useRouter } from 'next/navigation';

interface notes {
  folder_id: string | null;
}

interface noteReturn {
  notes: NoteTypes[];
  loading: boolean;
  title: string;
}

function useNotes({ folder_id }: notes): noteReturn {
  const [notes, setNotes] = useState<NoteTypes[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState('');
  const { folders } = useFolderState();
  const router = useRouter();

  const getNotesByFolderId = () => {
    if (!folder_id) {
      const filters = folders.find((item) => item.can_delete === false);
      setNotes(filters?.notes!);
      setTitle(filters?.name!);
      setIsLoading(false);
      return;
    }
    const filters = folders.find((item) => item.id_folder === folder_id);
    if (!filters) {
      router.push('/');
    }
    setIsLoading(false);
    setNotes(filters?.notes!);
    setTitle(filters?.name!);
  };

  useEffect(() => {
    getNotesByFolderId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder_id, folders]);
  return { notes, loading, title };
}

export default useNotes;
