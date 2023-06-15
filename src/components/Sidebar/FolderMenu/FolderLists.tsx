import React, { useState } from 'react';
import UpdateFolder from './UpdateFolder';
import Link from 'next/link';
import { LuFolderOpen } from 'react-icons/lu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CgOptions } from 'react-icons/cg';
import { FiEdit, FiTrash } from 'react-icons/fi';
import useFolderState from '@/hooks/useFolderState';
import { useFolder } from '@/store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteDataFolder, getFolders } from '@/lib/api';
import { useUserStore } from '@/store/userStore';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingIcons from 'react-loading-icons';
import { folderTypes } from '@/types';

const DropdownMenuFolder = ({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: JSX.Element;
}) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="focus:text-white cursor-pointer text-white/[60%] focus:bg-white/[5%] py-2"
    >
      {icon}
      <span className="text-[16px]">{label}</span>
    </DropdownMenuItem>
  );
};

const DialogDelete = ({ open, onOpenChange, data }: any) => {
  const deleteFolder = useFolder((state) => state.deleteFolder);
  const { toast } = useToast();
  const { mutateAsync: handleDeleteFolder, isLoading: onDeleting } = useMutation(
    (data: { id: string }) => {
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

function FolderLists() {
  const user = useUserStore((state) => state.user);
  const {
    setDataUpdate,
    setName,
    setEditFolder,
    folders,
    editFolder,
    dataUpdate,
    createFolder,
    setFolder,
    isLoading,
    setIsLoading,
  } = useFolderState();

  useQuery({
    queryKey: ['folder'],
    queryFn: async () => await getFolders({ user_id: user?.id }),
    onSuccess: (data) => {
      setIsLoading(false);
      setFolder(data);
    },
    enabled: !!user,
  });

  const [dialogDelete, setDialogDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any>({
    id: '',
    name: '',
    user_id: '',
  });

  const handleEditFolder = (item: { id?: string; name: string }) => {
    setDataUpdate({
      id: item.id,
      name: item.name,
    });
    setName(item.name);
    setEditFolder(true);
  };

  return (
    <>
      <DialogDelete
        data={deleteData}
        open={dialogDelete}
        onOpenChange={setDialogDelete}
      />
      {folders?.map((item, i) => (
        <div
          className="inactive-text hover:text-white hover:bg-white/[3%] px-[30px] transition rounded-md"
          key={i}
        >
          <div className="flex items-center justify-between">
            {editFolder && item.id === dataUpdate.id ? (
              <UpdateFolder />
            ) : (
              <>
                <Link
                  className="flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px]"
                  href={`/note/folders/${item.id}`}
                >
                  <div>
                    <LuFolderOpen className="text-[20px]" />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="truncate">{item.name}</TooltipTrigger>
                      <TooltipContent className="border border-white/[60%] bg-background text-white">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="outline-none ring-0 border-none"
                    asChild
                  >
                    <Button
                      size={'sm'}
                      variant={'ghost'}
                      className="ring-0 outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <CgOptions className="text-[20px]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border border-white/20">
                    <DropdownMenuFolder
                      icon={<FiEdit className="mr-2 text-[16px]" />}
                      label="Edit Folder"
                      onClick={() => handleEditFolder(item)}
                    />
                    {item.can_deleted && (
                      <DropdownMenuFolder
                        icon={<FiTrash className="mr-2 text-[16px]" />}
                        label="Delete Folder"
                        onClick={() => {
                          setDeleteData({
                            id: item.id,
                            name: item.name,
                          });
                          setDialogDelete(true);
                        }}
                      />
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex flex-col gap-[15px]">
          {Array(3)
            .fill(null)
            .map((item, i) => (
              <div
                className="flex items-center px-[30px] justify-between"
                key={i}
              >
                <div className="flex gap-2">
                  <Skeleton className="h-[30px] rounded-sm w-[25px]" />
                  <Skeleton className="h-[30px] rounded-sm w-[150px]" />
                </div>
                <Skeleton className="h-[30px] rounded-sm w-[25px] mr-2" />
              </div>
            ))}
        </div>
      )}
      {folders.length === 0 && createFolder === false && !isLoading && (
        <p className="px-[30px] text-center text-sm">Folder is empty</p>
      )}
    </>
  );
}

export default FolderLists;
