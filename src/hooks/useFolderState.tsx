'use client';
import { useBoundStore } from '@/components/Sidebar/Folder/store/boundStateFolderStore';
import { useFolder } from '@/store';
import { useState } from 'react';

interface dataDelete {
  id?: string;
  name: string;
}

function useFolderState() {
  const folders = useFolder((state) => state.folders);
  const setFolder = useFolder((state) => state.setFolder);
  const isLoading = useFolder((state) => state.isLoading);
  const setIsLoading = useFolder((state) => state.setIsLoading);

  // edit folder state
  const toggleEdit = useBoundStore((state) => state.toggleEditFolder);
  const setToggleEdit = useBoundStore((state) => state.setToggleEditFolder);

  // delete fodler state
  const [deleteData, setDeleteData] = useState<dataDelete>({
    id: '',
    name: '',
  });

  // create folder state
  const toggleCreate = useBoundStore((state) => state.toggleCreate);
  const setToggleCreate = useBoundStore((state) => state.setToggleCreate);

  // update folder state
  const dataUpdate = useBoundStore((state) => state.dataUpdate);
  const setDataUpdate = useBoundStore((state) => state.setDataUpdate);
  const updateStateFolder = useFolder((state) => state.editFolder);

  // update folder name state
  const name = useBoundStore((state) => state.name);
  const setName = useBoundStore((state) => state.setName);

  return {
    folders,
    toggleEdit,
    setToggleEdit,
    toggleCreate,
    setToggleCreate,
    dataUpdate,
    setDataUpdate,
    name,
    setName,
    setFolder,
    isLoading,
    setIsLoading,
    deleteData,
    setDeleteData,
    updateStateFolder,
  };
}

export default useFolderState;
