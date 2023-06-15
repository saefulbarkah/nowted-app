import { useToast } from '@/components/ui/use-toast';
import { createFolderToDb } from '@/lib/api';
import { folderTypes } from '@/types';
import { useMutation } from '@tanstack/react-query';
import useFolderState from './useFolderState';
import { useFolder } from '@/store';

interface useCreateFolderProps {
  handleCreateFolder: any;
  onHandleCreated: boolean;
}
interface useCreateFolderReturn {
  handleCreateFolder: any;
  onHandleCreated: boolean;
}

const useCreateFolder = (): useCreateFolderReturn => {
  const addFolder = useFolder((state) => state.addFolder);
  const { toast } = useToast();
  const { setName, setToggleCreate } = useFolderState();
  const mutateCreatedFolder = async (data: Partial<folderTypes>) => {
    return await createFolderToDb({ user_id: data.user_id, name: data.name });
  };

  const { mutateAsync: handleCreateFolder, isLoading: onHandleCreated } = useMutation(
    mutateCreatedFolder,
    {
      onSuccess: ({
        data,
        response,
        status,
      }: {
        data: folderTypes;
        response: string;
        status: number;
        error: string;
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
        addFolder({ name: data.name, user_id: data.user_id, id: data.id });
        setToggleCreate(false);
        setName('My New Folder');
      },
    }
  );
  return { handleCreateFolder, onHandleCreated };
};

export default useCreateFolder;
