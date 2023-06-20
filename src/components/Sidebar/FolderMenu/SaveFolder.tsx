import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useFolderState from '@/hooks/useFolderState';
import useValidation from '@/hooks/useValidation';
import { useFolder } from '@/store';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { FiFolderPlus, FiSave, FiX } from 'react-icons/fi';

function SaveFolder() {
  const {
    isCreateFolder,
    isEditFolder,
    setIsEdit,
    setIsCreate,
    setName,
    name,
    isError,
  } = useFolderState();
  const addFolder = useFolder((state) => state.addFolder);
  const folders = useFolder((state) => state.folders);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddFolder = () => {
    setIsLoading(true);
    const isExists = folders.some((item) => item.name === name);
    if (isExists) {
      setTimeout(() => {
        toast({
          title: 'Failed to created',
          description: `Folder ${name} already exists`,
          variant: 'danger',
        });
        setIsLoading(false);
      }, 500);
      return;
    }
    setTimeout(() => {
      toast({
        title: 'Succesfully created',
        variant: 'success',
      });
      setIsLoading(false);
      setIsCreate(false);
      addFolder({ name: name });
      setName('New Folder');
    }, 1000);
  };
  const handleUpdateFolder = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: 'Succesfully updated',
        variant: 'success',
      });
      setIsLoading(false);
      setIsEdit(false);
      setName('New Folder');
    }, 1000);
  };

  return (
    <>
      {isCreateFolder || isEditFolder ? (
        <div className="flex">
          <Button
            size={'sm'}
            variant={'ghost'}
            className="px-2 py-2"
            disabled={isError}
            onClick={() => {
              if (isCreateFolder) {
                handleAddFolder();
                return;
              }
              handleUpdateFolder();
            }}
          >
            {isLoading ? (
              <Loader2 className="h-[20px] w-[20px] animate-spin" />
            ) : (
              <FiSave className="text-[20px]" />
            )}
          </Button>
          <Button
            size={'sm'}
            variant={'ghost'}
            className="px-2 py-2"
            disabled={isLoading}
            onClick={() => {
              setIsCreate(false);
              setIsEdit(false);
              setName('New Folder');
            }}
          >
            <FiX className="text-[20px]" />
          </Button>
        </div>
      ) : (
        <Button size={'sm'} variant={'ghost'} onClick={() => setIsCreate(true)}>
          <FiFolderPlus className="text-[20px]" />
        </Button>
      )}
    </>
  );
}

export default SaveFolder;
