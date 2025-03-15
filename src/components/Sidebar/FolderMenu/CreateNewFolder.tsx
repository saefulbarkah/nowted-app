import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import useFolderState from '@/hooks/useFolderState';
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiFolderPlus } from 'react-icons/fi';

function CreateNewFolder() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ folder: string }>();
  const { folders, addFolder } = useFolderState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const handleAddFolder = handleSubmit((data) => {
    setIsLoading(true);
    const isExists = folders.some((item) => item.name === data.folder);
    if (isExists) {
      setTimeout(() => {
        toast({
          title: 'Failed to created',
          description: `Folder ${data.folder} already exists`,
          variant: 'danger',
        });
        setIsLoading(false);
      }, 500);
      return;
    }
    setTimeout(() => {
      setIsLoading(false);
      addFolder({ name: data.folder });
      setOpenDialog(false);
      reset({ folder: '' });
    }, 1000);
  });

  // const handleUpdateFolder = () => {
  //   setIsLoading(true);
  //   const isExists = isExistArray({
  //     array: folders,
  //     inArray: { key: 'id_folder', value: updateData.id_folder },
  //     equalTo: { key: 'name', value: updateData.name },
  //   });
  //   if (isExists) {
  //     setTimeout(() => {
  //       toast({
  //         title: 'Failed to update',
  //         description: `Folder ${updateData.name} already exists`,
  //         variant: 'danger',
  //       });
  //       setIsLoading(false);
  //     }, 500);
  //     return;
  //   }
  //   setTimeout(() => {
  //     toast({
  //       title: 'Succesfully updated',
  //       variant: 'success',
  //     });
  //     setIsLoading(false);
  //     setIsEdit(false);
  //     updateFolder({
  //       id_folder: updateData.id_folder,
  //       name: updateData.name,
  //     });
  //     setName('New Folder');
  //   }, 1000);
  // };

  return (
    <>
      <Dialog onOpenChange={setOpenDialog} open={isOpenDialog}>
        <DialogTrigger asChild>
          <Button size={'sm'} variant={'ghost'}>
            <FiFolderPlus className="text-[20px]" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>New Folder</DialogHeader>
          <div className="flex flex-col gap-1">
            <Input
              {...register('folder', { required: 'This is required' })}
              placeholder="Create new folder...."
              className={`${
                errors.folder && 'ring-red-500 focus-visible:ring-red-500'
              }`}
            />
            {errors.folder && (
              <p className="text-red-500 text-md">{errors.folder.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant={'secondary'}
              onClick={() => {
                setOpenDialog(false);
                reset({ folder: '' });
              }}
            >
              Cancel
            </Button>
            <Button
              variant={'default'}
              onClick={handleAddFolder}
              isLoading={isLoading}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateNewFolder;
