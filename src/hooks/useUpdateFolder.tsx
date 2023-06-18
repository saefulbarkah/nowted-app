import { updateDataFolder } from '@/lib/api';
import { folderTypes } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFolderState from './useFolderState';
import { useToast } from '@/components/ui/use-toast';
import { useFolderTitle } from '@/components/NoteLists/Lists';
import { useRouter } from 'next/navigation';

const useUpdateFolder = () => {
  const { toast } = useToast();
  const { setName, setToggleEdit } = useFolderState();
  const router = useRouter();
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
        await queryClient.invalidateQueries(['folders']);
        await queryClient.invalidateQueries(['find-note']);
        await queryClient.invalidateQueries(['notes']);
        // await queryClient.refetchQueries(['folders', 'notes']);
        toast({
          title: response,
          variant: 'success',
        });
        setToggleEdit(false);
        setName('My New Folder');
      },
    });

  return {
    handleUpdateFolder,
    onHandleUpdating,
  };
};

export default useUpdateFolder;
