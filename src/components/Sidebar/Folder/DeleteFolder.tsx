import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { deleteDataFolder } from '@/lib/api';
import { useFolder } from '@/store';
import { useMutation } from '@tanstack/react-query';
import React, { Dispatch, FC, SetStateAction } from 'react';
import LoadingIcons from 'react-loading-icons';

interface DeleteFolderProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: { id?: string; name: string };
}

const DeleteFolder: FC<DeleteFolderProps> = ({ open, onOpenChange, data }: DeleteFolderProps) => {
  const deleteFolder = useFolder((state) => state.deleteFolder);
  const { toast } = useToast();
  const { mutateAsync: handleDeleteFolder, isLoading: onDeleting } = useMutation(
    (data: { id?: string }) => {
      return deleteDataFolder({ id: data.id });
    },
    {
      onSuccess: ({ data, response }: { data: { id: string }; response: string }) => {
        const { id } = data;
        toast({
          title: response,
          variant: 'success',
        });
        onOpenChange(false);
        deleteFolder(id);
      },
    }
  );

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="bg-background border-white/[20%] flex flex-col justify-center items-center min-w-[120px]">
        <AlertDialogHeader className="text-[35px] font-semibold">Are you sure ?</AlertDialogHeader>
        <p>
          You will delete <span className="font-bold">{data.name}</span>
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => handleDeleteFolder({ id: data.id })}
            disabled={onDeleting ? true : false}
            className="bg-destructive/[30%] border border-destructive hover:bg-destructive/[70%] font-semibold"
          >
            {onDeleting ? (
              <div className="flex gap-2 items-center">
                <LoadingIcons.Oval
                  height={15}
                  width={15}
                  strokeWidth={5}
                />
                <p>Deleting...</p>
              </div>
            ) : (
              <p>Yes, delete it</p>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFolder;
