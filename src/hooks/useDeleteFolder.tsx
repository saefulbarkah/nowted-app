import { useToast } from '@/components/ui/use-toast';
import { deleteDataFolder } from '@/lib/api';
import { useFolder } from '@/store';
import { useRecentStore } from '@/store/useRecentStore';
import { folderTypes, noteTypes } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function useDeleteFolder() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const recents = useRecentStore((state) => state.recents);
  const deleteRecents = useRecentStore((state) => state.removeRecents);

  const deletingFolder = (data: { id: number }) => {
    return deleteDataFolder({ id: data.id });
  };

  const handleMutation = {
    onSuccess: async ({
      data,
      response,
    }: {
      data: Partial<folderTypes>;
      response: string;
    }) => {
      const { id } = data;
      let findRecent: number | null = null;
      const notes = data.notes?.map((item, i) => {
        let find = recents.find((recent) => recent.id === item.id);
        if (find) {
          findRecent = find.id;
        }
      });
      if (findRecent) {
        deleteRecents({ id: findRecent });
      }
      await queryClient.refetchQueries(['folders']);
      toast({
        title: response,
        variant: 'success',
      });
      router.push('/note');
      queryClient.invalidateQueries(['folders']);
    },
  };
  const {
    mutate: handleDeleteFolder,
    isLoading: onDeleting,
    isSuccess,
  } = useMutation(
    (data: { id: number }) => deletingFolder(data),
    handleMutation
  );

  return {
    handleDeleteFolder,
    onDeleting,
    isSuccess,
  };
}

export default useDeleteFolder;
