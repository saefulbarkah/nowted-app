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
import { useState } from 'react';

const DialogDelete = () => {
  const { toast } = useToast();
  const { isOpenDialogDelete, setDialogDelete, deleteData, removeFolder } =
    useFolderState();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteFolder = () => {
    setIsLoading(true);
    if (!deleteData.id_folder) {
      setIsLoading(false);
      return toast({
        title: 'Failed',
        description: 'Delete folder failed',
        variant: 'danger',
      });
    }
    setTimeout(() => {
      toast({
        title: 'Success',
        description: 'Delete folder successfully',
        variant: 'success',
      });
      setDialogDelete(false);
      setIsLoading(false);
      removeFolder({ id_folder: deleteData.id_folder });
    }, 1000);
  };

  return (
    <AlertDialog open={isOpenDialogDelete}>
      <AlertDialogContent className="bg-background border-white/[20%] flex flex-col justify-center items-center min-w-[120px]">
        <AlertDialogHeader className="text-[35px] font-semibold">
          Are you sure ?
        </AlertDialogHeader>
        <p>
          You will delete <span className="font-bold">{deleteData.name}</span>
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
