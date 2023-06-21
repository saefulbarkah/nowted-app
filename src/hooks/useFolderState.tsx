import { useFolderStateStore } from '@/components/Sidebar/FolderMenu/store';
import { useFolder } from '@/store';

function useFolderState() {
  // state store
  const folders = useFolder((state) => state.folders);
  const addFolder = useFolder((state) => state.addFolder);
  const updateFolder = useFolder((state) => state.updateFolder);

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
  const setUpdateData = useFolderStateStore((state) => state.setUpdateData);
  const setIsError = useFolderStateStore((state) => state.setIsError);

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

    // store
    folders,
    updateFolder,
    addFolder,
  };
}

export default useFolderState;
