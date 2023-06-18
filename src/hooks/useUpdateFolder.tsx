import { updateDataFolder } from '@/lib/api';
import { folderTypes } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFolderState from './useFolderState';
import { useToast } from '@/components/ui/use-toast';
import { useFolderTitle } from '@/components/NoteLists/Lists';

const useUpdateFolder = () => {
  const { toast } = useToast();
  const setTitle = useFolderTitle((state) => state.setTitle);
  const { setName, setToggleEdit } = useFolderState();
  const queryClient = useQueryClient();
  const mutateUpdateFolder = async (data: Partial<folderTypes>) => {
    return await updateDataFolder({
      id: data.id,
      name: data.name as string,
      user_id: data.user_id,
    });
  };

  const { mutateAsync: handleUpdateFolder, isLoading: onHandleUpdating } =
    useMutation(mutateUpdateFolder, {
      onSuccess: async ({
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
        await queryClient.refetchQueries(['folders']);
        toast({
          title: response,
          variant: 'success',
        });
        setToggleEdit(false);
        setName('My New Folder');
        queryClient.invalidateQueries(['folders']);
      },
    });

  return {
    handleUpdateFolder,
    onHandleUpdating,
  };
};

export default useUpdateFolder;
