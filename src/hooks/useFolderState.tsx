import { useBoundStore } from "@/components/Sidebar/FolderMenu/store/boundStateFolderStore";
import { folderType, useFolder } from "@/store";
import { useEffect, useState } from "react";

function useFolderState() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolder] = useState<folderType[]>([]);
  const folderStorage = useFolder((state) => state.folders);

  // edit folder state
  const editFolder = useBoundStore((state) => state.editFolder);
  const setEditFolder = useBoundStore((state) => state.setEditFolder);

  // create folder state
  const createFolder = useBoundStore((state) => state.createFolder);
  const setCreateFolder = useBoundStore((state) => state.setCreateFolder);

  // update folder state
  const dataUpdate = useBoundStore((state) => state.dataUpdate);
  const setDataUpdate = useBoundStore((state) => state.setDataUpdate);

  // update folder name state
  const name = useBoundStore((state) => state.name);
  const setName = useBoundStore((state) => state.setName);

  useEffect(() => {
    setFolder(folderStorage);
    setLoading(false);
  }, [folderStorage]);

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
    loading,
  };
}

export default useFolderState;
