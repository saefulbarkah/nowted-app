import { useToast } from '@/components/ui/use-toast';
import { createFolderToDb } from '@/lib/api';
import { folderTypes } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFolderState from './useFolderState';
import LoadingIcons from 'react-loading-icons';

interface useCreateFolderReturn {
  handleCreateFolder: any;
  onHandleCreated: boolean;
}

const useCreateFolder = (): useCreateFolderReturn => {
  const { toast } = useToast();
  const { setName, setToggleCreate } = useFolderState();
  const queryClient = useQueryClient();
  const mutateCreatedFolder = async (data: Partial<folderTypes>) => {
    return await createFolderToDb({ user_id: data.user_id, name: data.name });
  };

  const { mutate: handleCreateFolder, isLoading: onHandleCreated } =
    useMutation(mutateCreatedFolder, {
      onSuccess: async ({
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
        await queryClient.refetchQueries(['folders']);
        toast({
          title: response,
          variant: 'success',
        });
        setName('My New Folder');
        setToggleCreate(false);
        queryClient.invalidateQueries(['folders']);
      },
    });
  return { handleCreateFolder, onHandleCreated };
};

export default useCreateFolder;
