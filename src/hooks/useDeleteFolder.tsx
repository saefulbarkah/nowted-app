import { useToast } from '@/components/ui/use-toast';
import { deleteDataFolder } from '@/lib/api';
import { useFolder } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function useDeleteFolder() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deletingFolder = (data: { id: number }) => {
    return deleteDataFolder({ id: data.id });
  };

  const handleMutation = {
    onSuccess: async ({
      data,
      response,
    }: {
      data: { id: number };
      response: string;
    }) => {
      await queryClient.refetchQueries(['folders']);
      const { id } = data;
      toast({
        title: response,
        variant: 'success',
      });
      router.push('/note');
      queryClient.invalidateQueries(['folders']);
    },
  };
  const { mutate: handleDeleteFolder, isLoading: onDeleting } = useMutation(
    (data: { id: number }) => deletingFolder(data),
    handleMutation
  );

  return {
    handleDeleteFolder,
    onDeleting,
  };
}

export default useDeleteFolder;
