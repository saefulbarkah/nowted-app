import React from 'react';
import { DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { SlOptions } from 'react-icons/sl';
import { FiArchive, FiStar, FiTrash } from 'react-icons/fi';
import Dvider from '../../ui/Dvider';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';
import { Transition } from '@headlessui/react';
import MoveToTrash from './menus/MoveToTrash';
import { NoteTypes } from '@/types';

export interface TnoteProps {
  data: NoteTypes;
}

export const NoteMenuList = ({ data }: TnoteProps) => {
  const [open, setOpen] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          asChild
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Button
            className="rounded-full border-[2px] border-white/[50%] p-0 h-[40px] w-[40px]"
            variant={'ghost'}
          >
            <SlOptions />
          </Button>
        </DropdownMenuTrigger>
        <Transition
          show={open}
          enter="transition duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute"
        >
          <DropdownMenuContent className="bg-[#333333] p-[15px] translate-y-4 rounded-xl text-white w-[202px] absolute right-0 translate-x-5">
            <div className="flex flex-col gap-[5px]">
              <DropdownMenuItem className="focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]">
                <div className="flex items-center gap-[15px]">
                  <div className="text-[20px]">
                    <FiStar />
                  </div>
                  <p className="truncate">Favorite</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]">
                <div className="flex items-center gap-[15px]">
                  <div className="text-[20px]">
                    <FiArchive />
                  </div>
                  <p className="truncate">Move to archive</p>
                </div>
              </DropdownMenuItem>
              <Dvider />
              <DropdownMenuItem
                className="focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]"
                onClick={() => setOpenDialogDelete(true)}
              >
                <div className="flex items-center gap-[15px]">
                  <div className="text-[20px]">
                    <FiTrash />
                  </div>
                  <p className="truncate">Move to trash</p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </Transition>
      </DropdownMenu>

      {/* trash */}
      <MoveToTrash
        open={openDialogDelete}
        setOpen={setOpenDialogDelete}
        data={data}
      />
    </>
  );
};
