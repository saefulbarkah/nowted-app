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
import { isExistArray } from '@/lib/utils';
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiFolderPlus } from 'react-icons/fi';

function UpdateFolder() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
  } = useForm<{ folder: string }>();
  const { folders, updateFolder, isEditFolder, setIsEdit, updateData } =
    useFolderState();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateFolder = handleSubmit((data) => {
    setIsLoading(true);
    const isExists = isExistArray({
      array: folders,
      inArray: { key: 'id_folder', value: updateData.id_folder },
      equalTo: { key: 'name', value: data.folder },
    });
    if (isExists) {
      setTimeout(() => {
        toast({
          title: 'Failed to update',
          description: `Folder ${data.folder} already exists`,
          variant: 'danger',
        });
        setIsLoading(false);
      }, 500);
      return;
    }
    setTimeout(() => {
      toast({
        title: 'Succesfully updated',
        variant: 'success',
      });
      setIsLoading(false);
      setIsEdit(false);
      updateFolder({
        id_folder: updateData.id_folder,
        name: data.folder,
      });
      reset({ folder: '' });
    }, 1000);
  });

  useEffect(() => {
    setValue('folder', updateData.name);
  }, [updateData.name]);

  return (
    <>
      <Dialog onOpenChange={setIsEdit} open={isEditFolder}>
        <DialogContent>
          <DialogHeader>New Folder</DialogHeader>
          <div className="flex flex-col gap-1">
            <Input
              {...register('folder', {
                required: 'This is required',
              })}
              defaultValue={updateData.name}
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
                setIsEdit(false);
                reset({ folder: '' });
              }}
            >
              Cancel
            </Button>
            <Button
              variant={'default'}
              onClick={handleUpdateFolder}
              isLoading={isLoading}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateFolder;
