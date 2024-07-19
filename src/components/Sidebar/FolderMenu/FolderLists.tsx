'use client';
import React from 'react';
import Link from 'next/link';
import { LuFolder, LuFolderOpen } from 'react-icons/lu';
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
import { FiEdit, FiTrash } from 'react-icons/fi';
import { FolderTypes } from '@/types';
import useFolderState from '@/hooks/useFolderState';
import { useParams } from 'next/navigation';
import { useActiveNote } from '@/store/useActiveNote';
import { useSidebar } from '@/components/Mobile/Sidebar';
import { useFavoriteActive } from '@/components/Favorites';

function FolderLists() {
  const {
    isEditFolder,
    isCreateFolder,
    updateData,
    folders,
    setUpdateData,
    setIsEdit,
    setDialogDelete,
    setDeleteData,
  } = useFolderState();
  const params = useParams();
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const setFavoriteActive = useFavoriteActive(
    (state) => state.setFavoriteActive
  );
  const setSidebar = useSidebar((state) => state.setOpen);

  return (
    <>
      {folders?.map((item: FolderTypes, i: any) => (
        <React.Fragment key={i}>
          <div
            className={`inactive-text hover:text-white hover:bg-white/[3%] px-[30px] ${
              params.folderId === item.id_folder
                ? 'bg-white/[3%] text-white'
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <>
                <Link
                  className={`flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px] relative`}
                  href={`/app/folders/${item.id_folder}`}
                  onClick={() => {
                    setActiveNote(null);
                    setFavoriteActive(null);
                    setSidebar(false);
                  }}
                >
                  <div>
                    {item.id_folder === params.folderId ? (
                      <LuFolderOpen className="text-[20px]" />
                    ) : (
                      <LuFolder className="text-[20px]" />
                    )}
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
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            </div>
          </div>
        </React.Fragment>
      ))}
      {folders?.length === 0 && isCreateFolder === false && (
        <div className="flex items-center justify-center">
          <p className="px-[30px] text-sm inactive-text">Folder is empty</p>
        </div>
      )}
    </>
  );
}

export default FolderLists;
