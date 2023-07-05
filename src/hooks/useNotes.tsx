'use client';
import { NoteTypes } from '@/types';
import { useEffect, useState } from 'react';
import useFolderState from './useFolderState';
import { useRouter } from 'next/navigation';

interface notes {
  folder_id: string | null;
}

interface noteReturn {
  notes: NoteTypes[] | null;
  loading: boolean;
  title: string;
}

function useNotes({ folder_id }: notes): noteReturn {
  const { folders } = useFolderState();
  const [notes, setNotes] = useState<NoteTypes[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const router = useRouter();

  const getNotesByFolderId = async () => {
    const filters = folders.find((item) => item.id_folder === folder_id);
    if (!filters) {
      router.replace('/app');
    }
    const notes = filters?.notes.filter((item) => item.deletedAt === null);
    setNotes(notes!);
    setTitle(filters?.name!);
  };

  useEffect(() => {
    getNotesByFolderId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder_id, folders]);
  return { notes, title, loading };
}

export default useNotes;
