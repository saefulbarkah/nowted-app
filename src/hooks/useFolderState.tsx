import { useFolderStateStore } from '@/components/Sidebar/FolderMenu/store';
import { useNowtedStore } from '@/store';

function useFolderState() {
  // state store
  const folders = useNowtedStore((state) => state.folders);
  const addFolder = useNowtedStore((state) => state.addFolder);
  const updateFolder = useNowtedStore((state) => state.updateFolder);
  const removeFolder = useNowtedStore((state) => state.removeFolder);

  // init state
  const name = useFolderStateStore((state) => state.name);
  const isError = useFolderStateStore((state) => state.isError);
  const isCreateFolder = useFolderStateStore((state) => state.isCreateFolder);
  const isEditFolder = useFolderStateStore((state) => state.isEditFolder);
  const updateData = useFolderStateStore((state) => state.updateData);
  const deleteData = useFolderStateStore((state) => state.deleteData);
  const isOpenDialogDelete = useFolderStateStore(
    (state) => state.isOpenDialogDelete
  );

  //   state action
  const setIsEdit = useFolderStateStore((state) => state.setIsEdit);
  const setIsCreate = useFolderStateStore((state) => state.setIsCreate);
  const setDialogDelete = useFolderStateStore((state) => state.setDialogDelete);
  const setName = useFolderStateStore((state) => state.setName);
  const setIsError = useFolderStateStore((state) => state.setIsError);
  const setUpdateData = useFolderStateStore((state) => state.setUpdateData);
  const setDeleteData = useFolderStateStore((state) => state.setDeleteData);

  return {
    name,
    isError,
    isCreateFolder,
    isEditFolder,
    updateData,
    deleteData,
    isOpenDialogDelete,
    setName,
    setIsEdit,
    setIsCreate,
    setUpdateData,
    setDialogDelete,
    setIsError,
    setDeleteData,

    // store
    folders,
    updateFolder,
    addFolder,
    removeFolder,
  };
}

export default useFolderState;
