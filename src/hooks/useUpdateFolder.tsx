import { updateDataFolder } from '@/lib/api';
import { folderTypes } from '@/types';
import { useMutation } from '@tanstack/react-query';
import useFolderState from './useFolderState';
import { useToast } from '@/components/ui/use-toast';
import { useFolder } from '@/store';

interface updateData {
  id: string;
  name: string;
  user_id: string;
}

interface returnProps {
  handleUpdateFolder: (data: updateData) => void;
  onHandleUpdating: boolean;
}
const useUpdateFolder = () => {
  const { toast } = useToast();
  const updateFolder = useFolder((state) => state.editFolder);
  const { setName, setToggleEdit } = useFolderState();
  const mutateUpdateFolder = async (data: Partial<folderTypes>) => {
    return await updateDataFolder({
      id: data.id as string,
      name: data.name as string,
      user_id: data.user_id,
    });
  };

  const { mutateAsync: handleUpdateFolder, isLoading: onHandleUpdating } = useMutation(
    mutateUpdateFolder,
    {
      onSuccess: ({
        data,
        response,
        status,
      }: {
        data: folderTypes;
        response: string;
        status: number;
      }) => {
        if (status === 400) {
          toast({
            title: 'Invalid Request',
            description: response,
            variant: 'danger',
          });
          return;
        }
        toast({
          title: response,
          variant: 'success',
        });
        console.log(data);
        updateFolder(data);
        setToggleEdit(false);
        setName('My New Folder');
      },
    }
  );

  return {
    handleUpdateFolder,
    onHandleUpdating,
  };
};

export default useUpdateFolder;
