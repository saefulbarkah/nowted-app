import useFolderState from '@/hooks/useFolderState';
import { FolderTypes, NoteTypes } from '@/types';
import { useEffect, useState } from 'react';

interface getNotesByFolderId {
  find: { note_id: string; folder_id: string };
}
export const useNote = ({ find }: getNotesByFolderId) => {
  const { folders } = useFolderState();
  const [note, setNote] = useState<NoteTypes>();
  const [folder, setFolder] = useState<FolderTypes>();
  const [loading, setLoading] = useState(true);

  function queryingNote() {
    return new Promise((resolve) => {
      const findFolder = folders.find(
        (item) => item.id_folder === find.folder_id
      );
      if (!findFolder) return;
      const note = findFolder.notes as NoteTypes[];
      const queryNote = note.find((item) => item.id_note === find.note_id);
      setNote(queryNote);
      setFolder(findFolder);
      resolve({ queryNote, findFolder });
    });
  }

  async function getNote() {
    await queryingNote();
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getNote();
  }, [find.folder_id, find.note_id]);

  return { note, loading, folder };
};
