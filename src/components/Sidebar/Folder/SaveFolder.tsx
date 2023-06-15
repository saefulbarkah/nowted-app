'use client';
import { Button } from '@/components/ui/button';
import useCreateFolder from '@/hooks/useCreateFolder';
import useFolderState from '@/hooks/useFolderState';
import useUpdateFolder from '@/hooks/useUpdateFolder';
import { useUserStore } from '@/store/userStore';
import React, { FC } from 'react';
import { FiFolderPlus, FiSave, FiX } from 'react-icons/fi';
import LoadingIcons from 'react-loading-icons';

interface SaveFolderProps {}

const SaveFolder: FC<SaveFolderProps> = ({}) => {
  const {
    isLoading,
    setToggleCreate,
    setToggleEdit,
    toggleCreate,
    toggleEdit,
    setName,
    name,
    dataUpdate,
  } = useFolderState();
  const user = useUserStore((state) => state.user);
  const { handleCreateFolder, onHandleCreated } = useCreateFolder();
  const { handleUpdateFolder, onHandleUpdating } = useUpdateFolder();

  const renderCreateFolder = () => {
    return (
      <Button
        size={'sm'}
        variant={'ghost'}
        disabled={isLoading ? true : false}
        onClick={() => {
          setToggleCreate(true);
        }}
      >
        <FiFolderPlus className="text-[20px]" />
      </Button>
    );
  };
  const renderLoadingButton = () => {
    return (
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
    );
  };

  const renderSaveFolder = () => {
    return (
      <Button
        size={'sm'}
        variant={'ghost'}
        onClick={() => {
          if (toggleCreate) {
            handleCreateFolder({ name, user_id: user?.id });
            return;
          }
          handleUpdateFolder({ id: dataUpdate.id, name: name });
        }}
        className="px-2 py-2"
      >
        <FiSave className="text-[20px]" />
      </Button>
    );
  };

  const renderCloseFolder = () => {
    return (
      <Button
        size={'sm'}
        variant={'ghost'}
        onClick={() => {
          setToggleCreate(false);
          setToggleEdit(false);
          setName('My New Folder');
        }}
        className="px-2 py-2"
      >
        <FiX className="text-[20px]" />
      </Button>
    );
  };

  return (
    <React.Fragment>
      {toggleCreate || toggleEdit ? (
        <div className="flex">
          {onHandleCreated || onHandleUpdating ? renderLoadingButton() : <>{renderSaveFolder()}</>}
          {renderCloseFolder()}
        </div>
      ) : (
        renderCreateFolder()
      )}
    </React.Fragment>
  );
};

export default SaveFolder;
