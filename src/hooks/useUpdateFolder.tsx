import { updateDataFolder } from '@/lib/api';
import { folderTypes } from '@/types';
import { useMutation } from '@tanstack/react-query';
import useFolderState from './useFolderState';
import { useToast } from '@/components/ui/use-toast';
import { useFolder } from '@/store';
import { useRouter } from 'next/navigation';
import { useFolderTitle } from './useNoteLists';

interface updateData {
  id: string;
  name: string;
  user_id: string;
}

const useUpdateFolder = () => {
  const { toast } = useToast();
  const updateFolder = useFolder((state) => state.editFolder);
  const setTitle = useFolderTitle((state) => state.setTitle);
  const { setName, setToggleEdit } = useFolderState();
  const router = useRouter();
  const mutateUpdateFolder = async (data: Partial<folderTypes>) => {
    return await updateDataFolder({
      id: data.id,
      name: data.name as string,
      user_id: data.user_id,
    });
  };

  const { mutateAsync: handleUpdateFolder, isLoading: onHandleUpdating } =
    useMutation(mutateUpdateFolder, {
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
        updateFolder(data);
        setToggleEdit(false);
        setName('My New Folder');
        setTitle(data.name);
        router.refresh();
      },
    });

  return {
    handleUpdateFolder,
    onHandleUpdating,
  };
};

export default useUpdateFolder;
