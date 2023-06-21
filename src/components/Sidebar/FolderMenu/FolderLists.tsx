'use client';
import React from 'react';
import Link from 'next/link';
import { LuFolderOpen } from 'react-icons/lu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CgOptions } from 'react-icons/cg';
import { FiEdit, FiInfo, FiTrash } from 'react-icons/fi';
import { FolderTypes } from '@/types';
import UpdateFolder from './EditFolder';
import useFolderState from '@/hooks/useFolderState';
import { slug } from '@/lib/utils';
import { useNowtedStore } from '@/store';

function FolderLists() {
  const folders = useNowtedStore((state) => state.folders);
  const {
    isEditFolder,
    isCreateFolder,
    updateData,
    setUpdateData,
    setIsEdit,
    setDialogDelete,
    setDeleteData,
  } = useFolderState();

  return (
    <>
      {folders?.map((item: FolderTypes, i: any) => (
        <>
          <div
            className="inactive-text hover:text-white hover:bg-white/[3%] px-[30px] transition rounded-md"
            key={i}
          >
            <div className="flex items-center justify-between">
              {isEditFolder && item.id_folder === updateData.id_folder ? (
                <UpdateFolder />
              ) : (
                <>
                  <Link
                    className={`flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px] relative`}
                    href={`?folder=${slug(item.name)}&folder_id=${
                      item.id_folder
                    }`}
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
                    <DropdownMenuContent className="bg-background border border-white/20 flex flex-col gap-2 items-center ">
                      <DropdownMenuItem
                        className="focus:text-white w-[150px] cursor-pointer text-white/[60%] focus:bg-white/[5%] py-2"
                        onClick={() => {
                          setUpdateData(item);
                          setIsEdit(true);
                        }}
                      >
                        <FiEdit className="mr-2 text-[16px]" />
                        <span className="text-[16px]">Edit Folder</span>
                      </DropdownMenuItem>
                      {item.can_delete && (
                        <DropdownMenuItem
                          className="focus:text-white w-[150px] cursor-pointer text-white/[60%] focus:bg-white/[5%] py-2"
                          onClick={() => {
                            setDeleteData(item);
                            setDialogDelete(true);
                          }}
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
        </>
      ))}
      {folders?.length === 0 && isCreateFolder === false && (
        <p className="px-[30px] text-center text-sm">Folder is empty</p>
      )}
    </>
  );
}

export default FolderLists;
