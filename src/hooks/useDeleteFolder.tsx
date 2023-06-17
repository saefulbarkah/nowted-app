import { useToast } from '@/components/ui/use-toast';
import { deleteDataFolder } from '@/lib/api';
import { useFolder } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function useDeleteFolder() {
  const deleteFolder = useFolder((state) => state.deleteFolder);
  const { toast } = useToast();
  const router = useRouter();

  const deletingFolder = (data: { id: number }) => {
    return deleteDataFolder({ id: data.id });
  };

  const handleMutation = {
    onSuccess: ({
      data,
      response,
    }: {
      data: { id: number };
      response: string;
    }) => {
      const { id } = data;
      toast({
        title: response,
        variant: 'success',
      });
      deleteFolder(id);
      router.push('/note');
    },
  };
  const {
    mutateAsync: handleDeleteFolder,
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
