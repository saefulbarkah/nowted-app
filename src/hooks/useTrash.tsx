import React from 'react';
import useFolderState from './useFolderState';
import { NoteTypes } from '@/types';

const useTrash = () => {
  const [trash, setTrash] = React.useState<NoteTypes[] | null>(null);
  const { folders } = useFolderState();
  function getTrashLists() {
    const findNoteOnTrash = folders.reduce((results, item) => {
      const filteredData = item.notes.filter((item) => item.deletedAt !== null);
      return results.concat(filteredData as []);
    }, []);
    setTrash(findNoteOnTrash);
  }

  React.useEffect(() => {
    getTrashLists();
  }, [folders]);

  return { trash };
};

export default useTrash;
