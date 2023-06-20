import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useFolderState from '@/hooks/useFolderState';
import React from 'react';
import { FiFolderPlus, FiSave, FiX } from 'react-icons/fi';

function SaveFolder() {
  const { isCreateFolder, isEditFolder, setIsEdit, setIsCreate, setName } =
    useFolderState();
  const { toast } = useToast();

  const handleAddFolder = () => {
    toast({
      title: 'Succesfully created',
      variant: 'success',
    });
    setIsCreate(false);
  };
  const handleUpdateFolder = () => {
    alert('updated');
    setIsEdit(false);
  };

  return (
    <>
      {isCreateFolder || isEditFolder ? (
        <div className="flex">
          <Button size={'sm'} variant={'ghost'} className="px-2 py-2">
            <FiSave
              className="text-[20px]"
              onClick={() => {
                if (isCreateFolder) {
                  handleAddFolder();
                  return;
                }
                handleUpdateFolder();
              }}
            />
          </Button>
          <Button
            size={'sm'}
            variant={'ghost'}
            className="px-2 py-2"
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
