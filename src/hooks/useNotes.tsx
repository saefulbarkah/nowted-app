'use client';
import { NoteTypes } from '@/types';
import { useEffect, useState } from 'react';
import useFolderState from './useFolderState';

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

  const promiseGetNote = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filters = folders.find((item) => item.id_folder === folder_id);
        const notes = filters?.notes.filter((item) => item.deletedAt === null);
        setNotes(notes!);
        setTitle(filters?.name!);
        resolve(1);
      }, 500);
    });
  };

  const getNotesByFolderId = async () => {
    await promiseGetNote();
    setIsLoading(false);
  };

  useEffect(() => {
    getNotesByFolderId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder_id, folders]);
  return { notes, loading, title };
}

export default useNotes;
