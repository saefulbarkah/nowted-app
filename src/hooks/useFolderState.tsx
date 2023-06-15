import { useBoundStore } from '@/components/Sidebar/FolderMenu/store/boundStateFolderStore';
import { useFolder } from '@/store';

function useFolderState() {
  const folders = useFolder((state) => state.folders);
  const setFolder = useFolder((state) => state.setFolder);
  const isLoading = useFolder((state) => state.isLoading);
  const setIsLoading = useFolder((state) => state.setIsLoading);

  // edit folder state
  const editFolder = useBoundStore((state) => state.editFolder);
  const setEditFolder = useBoundStore((state) => state.setEditFolder);

  // create folder state
  const createFolder = useBoundStore((state) => state.createFolder);
  const setCreateFolder = useBoundStore((state) => state.setCreateFolder);

  // update folder state
  const dataUpdate = useBoundStore((state) => state.dataUpdate);
  const setDataUpdate = useBoundStore((state) => state.setDataUpdate);
  const updateStateFolder = useFolder((state) => state.editFolder);

  // update folder name state
  const name = useBoundStore((state) => state.name);
  const setName = useBoundStore((state) => state.setName);

  return {
    folders,
    editFolder,
    setEditFolder,
    createFolder,
    setCreateFolder,
    dataUpdate,
    setDataUpdate,
    name,
    setName,
    setFolder,
    isLoading,
    setIsLoading,
    updateStateFolder,
  };
}

export default useFolderState;
