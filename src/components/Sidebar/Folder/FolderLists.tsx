'use client';
import React, { FC, useEffect, useState } from 'react';
import { LuFolderOpen } from 'react-icons/lu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CgOptions } from 'react-icons/cg';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { folderTypes } from '@/types';
import { FiEdit, FiTrash } from 'react-icons/fi';
import UpdateFolder from './UpdateFolder';
import useFolderState from '@/hooks/useFolderState';
import DeleteFolder from './DeleteFolder';
import { useSearchParams, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useFolderTitle } from '@/hooks/useNoteLists';
import { slug } from '@/lib/utils';

interface ListFolderProps {
  data: folderTypes[];
}

const ListFolder: FC<ListFolderProps> = ({ data }) => {
  const currTitleFolder = useFolderTitle((state) => state.title);
  const searchParams = useSearchParams();
  const getNameFolder = searchParams.get('folder');

  const {
    setName,
    toggleEdit,
    setToggleEdit,
    dataUpdate,
    setDataUpdate,
    deleteData,
    setDeleteData,
    folders,
    setFolder,
    setIsLoading,
    isLoading,
  } = useFolderState();
  const [dialogDelete, setDialogDelete] = useState(false);

  const handleEditFolder = (item: { id: number; name: string }) => {
    setDataUpdate({
      id: item.id,
      name: item.name,
    });
    setName(item.name);
    setToggleEdit(true);
  };

  useEffect(() => {
    setIsLoading(false);
    setFolder(data);
  }, [data]);

  return (
    <>
      <DeleteFolder
        data={deleteData}
        open={dialogDelete}
        onOpenChange={setDialogDelete}
      />
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
      {folders?.map((item, i) => (
        <div
          className={`inactive-text hover:text-white hover:bg-white/[3%] px-[30px] transition rounded-md ${
            getNameFolder === slug(item.name) && 'bg-white/[3%] text-white'
          } ${
            currTitleFolder === slug(item.name) &&
            !getNameFolder &&
            'bg-white/[3%] text-white'
          }`}
          key={i}
        >
          <div className="flex items-center justify-between">
            {toggleEdit && item.id === dataUpdate.id ? (
              <UpdateFolder />
            ) : (
              <>
                <Link
                  className="flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px]"
                  href={`/note?folder=${slug(item.name)}&folder_id=${item.id}`}
                >
                  <div>
                    <LuFolderOpen className="text-[20px]" />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="truncate">
                        {item.name}
                      </TooltipTrigger>
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
                    <DropdownMenuItem
                      className={`focus:text-white cursor-pointer text-white/[60%] focus:bg-white/[5%] py-2`}
                      onClick={() => handleEditFolder(item)}
                    >
                      <FiEdit className="mr-2 text-[16px]" />
                      <span className="text-[16px]">Edit Folder</span>
                    </DropdownMenuItem>
                    {item.can_deleted && (
                      <DropdownMenuItem
                        onClick={() => {
                          setDeleteData({
                            id: item.id,
                            name: item.name,
                          });
                          setDialogDelete(true);
                        }}
                        className="focus:text-white cursor-pointer text-white/[60%] focus:bg-white/[5%] py-2"
                      >
                        <FiTrash className="mr-2 text-[16px]" />
                        <span className="text-[16px]">Delete Folder</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="px-[30px] text-center text-sm">Folder is empty</p>
      )}
    </>
  );
};

export default ListFolder;
