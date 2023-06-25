import useFolderState from '@/hooks/useFolderState';
import { FolderTypes, NoteTypes } from '@/types';
import { useEffect, useState } from 'react';

interface getNotesByFolderId {
  find: { note_id: string; folder_id: string };
}
const useNote = ({ find }: getNotesByFolderId) => {
  const { folders } = useFolderState();
  const [note, setNote] = useState<NoteTypes>();
  const [folder, setFolder] = useState<FolderTypes>();
  const [loading, setLoading] = useState(true);

  function queryingNote() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const findFolder = folders.find(
          (item) => item.id_folder === find.folder_id
        );
        if (!findFolder) return;
        const note = findFolder.notes as NoteTypes[];
        const queryNote = note.find((item) => item.id_note === find.note_id);
        setNote(queryNote);
        setFolder(findFolder);
        resolve({ queryNote, findFolder });
        setLoading(false);
      }, 1000);
    });
  }

  async function getNote() {
    setLoading(true);
    await queryingNote();
  }

  useEffect(() => {
    getNote();
  }, [find.note_id]);

  return { note, loading, folder };
};

export default useNote;
