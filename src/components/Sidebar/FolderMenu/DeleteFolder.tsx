import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useFolderState from '@/hooks/useFolderState';
import { useRecentStore } from '@/store/useRecentStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DialogDelete = () => {
  const { toast } = useToast();
  const { isOpenDialogDelete, setDialogDelete, deleteData, removeFolder } =
    useFolderState();
  const [isLoading, setIsLoading] = useState(false);
  const removeRecents = useRecentStore((state) => state.removeRecents);
  const recents = useRecentStore((state) => state.recents);
  const router = useRouter();

  const handleDeleteFolder = () => {
    recents.map((item) =>
      item.folder_id === deleteData.id_folder
        ? removeRecents({ id_note: item.id_note })
        : null
    );
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: 'Success',
        description: 'Delete folder successfully',
        variant: 'success',
      });
      setDialogDelete(false);
      setIsLoading(false);
      removeFolder({ id_folder: deleteData.id_folder });
      router.replace('/');
    }, 1000);
  };

  return (
    <AlertDialog open={isOpenDialogDelete}>
      <AlertDialogContent className="bg-background border-white/[20%] flex flex-col justify-center items-center nax-w-[120px]">
        <AlertDialogHeader className="text-[35px] font-semibold">
          <span>Are you sure ?</span>
        </AlertDialogHeader>
        <p>
          You will delete <span className="font-bold">{deleteData.name}</span>
        </p>
        <p className="italic text-sm inactive-text break-words">
          this will delete everything including your notes and also in the trash
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDialogDelete(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteFolder()}
            className="bg-destructive/[30%] border border-destructive hover:bg-destructive/[70%] font-semibold"
            asChild
          >
            <Button isLoading={isLoading}>Yes, delete it</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDelete;
