import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useFolderState from '@/hooks/useFolderState';
import useValidation from '@/hooks/useValidateName';
import { createFolderToDb, updateDataFolder } from '@/lib/api';
import { useFolder } from '@/store';
import { useUserStore } from '@/store/userStore';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FiFolderPlus, FiSave, FiX } from 'react-icons/fi';
import { folderTypes } from '@/types';
import LoadingIcons from 'react-loading-icons';

function CreateOrUpdateFolder() {
  const updateFolder = useFolder((state) => state.editFolder);
  const {
    createFolder,
    editFolder,
    setCreateFolder,
    setEditFolder,
    name,
    setName,
    dataUpdate,
    isLoading,
  } = useFolderState();
  useValidation({
    data: name,
  });

  const { toast } = useToast();
  const addFolder = useFolder((state) => state.addFolder);
  const user = useUserStore((state) => state.user);

  const mutateCreatedFolder = async (data: Partial<folderTypes>) => {
    return await createFolderToDb({ user_id: data.user_id, name: data.name });
  };

  const { mutateAsync: handleCreateFolder, isLoading: onHandleCreated } = useMutation(
    mutateCreatedFolder,
    {
      onSuccess: ({
        data,
        response,
        status,
        error,
      }: {
        data: folderTypes;
        response: string;
        status: number;
        error: string;
      }) => {
        if (status === 400) {
          toast({
            title: 'Invalid Request',
            description: response,
            variant: 'danger',
          });
          return;
        }
        toast({
          title: response,
          variant: 'success',
        });
        addFolder({ name: data.name, user_id: data.user_id, id: data.id });
        setCreateFolder(false);
        setName('My New Folder');
      },
    }
  );

  const mutateUpdateFolder = async (data: Partial<folderTypes>) => {
    return await updateDataFolder({
      id: data.id as string,
      name: data.name as string,
      user_id: user?.id,
    });
  };

  const { mutateAsync: handleUpdateFolder, isLoading: onHandleUpdating } = useMutation(
    mutateUpdateFolder,
    {
      onSuccess: ({
        data,
        response,
        status,
      }: {
        data: folderTypes;
        response: string;
        status: number;
      }) => {
        if (status === 400) {
          toast({
            title: 'Invalid Request',
            description: response,
            variant: 'danger',
          });
          return;
        }
        toast({
          title: response,
          variant: 'success',
        });
        console.log(data);
        updateFolder(data);
        setEditFolder(false);
        setName('My New Folder');
      },
    }
  );

  const handleCloseFolderButton = () => {
    setName('My New Folder');
    if (createFolder) {
      return setCreateFolder(false);
    }
    if (editFolder) {
      return setEditFolder(false);
    }
  };

  return (
    <>
      {createFolder || editFolder ? (
        <div className="flex">
          {onHandleCreated || onHandleUpdating ? (
            <Button
              size={'sm'}
              variant={'ghost'}
            >
              <LoadingIcons.Oval
                height={18}
                width={18}
                strokeWidth={4}
              />
            </Button>
          ) : (
            <Button
              size={'sm'}
              variant={'ghost'}
              onClick={() => {
                if (createFolder) {
                  handleCreateFolder({ name, user_id: user?.id });
                  return;
                }
                handleUpdateFolder({ id: dataUpdate.id, name: name });
              }}
              className="px-2 py-2"
            >
              <FiSave className="text-[20px]" />
            </Button>
          )}
          <Button
            size={'sm'}
            variant={'ghost'}
            onClick={() => handleCloseFolderButton()}
            className="px-2 py-2"
          >
            <FiX className="text-[20px]" />
          </Button>
        </div>
      ) : (
        <Button
          size={'sm'}
          variant={'ghost'}
          disabled={isLoading ? true : false}
          onClick={() => {
            setCreateFolder(true);
          }}
        >
          <FiFolderPlus className="text-[20px]" />
        </Button>
      )}
    </>
  );
}

export default CreateOrUpdateFolder;
