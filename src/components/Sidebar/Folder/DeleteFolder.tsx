import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import useDeleteFolder from '@/hooks/useDeleteFolder';
import { useRouter } from 'next/navigation';
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';

interface DeleteFolderProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: { id: number; name: string };
}

const DeleteFolder: FC<DeleteFolderProps> = ({
  open,
  onOpenChange,
  data,
}: DeleteFolderProps) => {
  const { isSuccess, handleDeleteFolder, onDeleting } = useDeleteFolder();

  useEffect(() => {
    onOpenChange(false);
  }, [isSuccess, onOpenChange]);
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-background border-white/[20%] flex flex-col justify-center items-center min-w-[120px]">
        <AlertDialogHeader className="text-[35px] font-semibold">
          Are you sure ?
        </AlertDialogHeader>
        <p>
          You will delete <span className="font-bold">{data.name}</span>
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => handleDeleteFolder({ id: data.id })}
            isLoading={onDeleting}
            className="bg-destructive/[30%] border border-destructive hover:bg-destructive/[70%] font-semibold"
          >
            {onDeleting ? <p>please wait...</p> : <p>Yes, delete it</p>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFolder;
