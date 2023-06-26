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

  async function getNote() {
    if (!find.note_id) return;
    const findFolder = folders.find(
      (item) => item.id_folder === find.folder_id
    );
    if (!findFolder) return;
    const note = findFolder.notes as NoteTypes[];
    const queryNote = note.find((item) => item.id_note === find.note_id);
    setNote(queryNote);
    setFolder(findFolder);
  }

  useEffect(() => {
    getNote();
  }, [find.note_id, folders]);

  return { note, folder };
};

export default useNote;
