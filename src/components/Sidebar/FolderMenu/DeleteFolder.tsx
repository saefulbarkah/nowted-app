import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import useFolderState from '@/hooks/useFolderState';

const DialogDelete = () => {
  const { toast } = useToast();
  const { isOpenDialogDelete, setDialogDelete } = useFolderState();

  const handleDeleteFolder = () => {
    setTimeout(() => {
      toast({
        title: 'Success',
        description: 'Delete folder successfully',
        variant: 'success',
      });
    }, 500);
  };

  return (
    <AlertDialog open={isOpenDialogDelete} onOpenChange={setDialogDelete}>
      <AlertDialogContent className="bg-background border-white/[20%] flex flex-col justify-center items-center min-w-[120px]">
        <AlertDialogHeader className="text-[35px] font-semibold">
          Are you sure ?
        </AlertDialogHeader>
        <p>
          You will delete <span className="font-bold">....</span>
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteFolder()}
            className="bg-destructive/[30%] border border-destructive hover:bg-destructive/[70%] font-semibold"
          >
            Yes, delete it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDelete;
