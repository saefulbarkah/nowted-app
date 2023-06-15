import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useFolderState from '@/hooks/useFolderState';
import useValidation from '@/hooks/useValidateName';
import { createFolderToDb } from '@/lib/api';
import { useFolder } from '@/store';
import { useUserStore } from '@/store/userStore';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FiFolderPlus, FiSave, FiX } from 'react-icons/fi';
import { string } from 'yup';
import { folders } from '@prisma/client';
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
  const { isError } = useValidation({
    data: name,
  });
  const { toast } = useToast();
  const addFolder = useFolder((state) => state.addFolder);
  const user = useUserStore((state) => state.user);

  const { mutateAsync: handleCreateFolder, isLoading: onMutation } =
    useMutation(
      (data: { name: string }) => {
        return createFolderToDb({ name: data.name, user_id: user?.id });
      },
      {
        onSuccess: ({
          data,
          response,
        }: {
          data: folderTypes;
          response: string;
        }) => {
          toast({
            title: response,
            variant: 'success',
          });
          addFolder({ name: data.name, user_id: data.user_id });
          setCreateFolder(false);
        },
        onError: () => {
          alert('error');
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
          {onMutation ? (
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
                  handleCreateFolder({ name });
                  return;
                }
                alert('edit folder');
                return;
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
