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
import { useNowtedStore } from '@/store';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useFavoriteActive } from '@/components/Favorites';

export interface TnoteProps {
  data: NoteTypes;
}

export const NoteMenuList = ({ data }: TnoteProps) => {
  const [open, setOpen] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const addToFavorite = useNowtedStore((state) => state.addToFavorite);
  const setFavorites = useFavoriteActive((state) => state.setFavoriteActive);
  const removeFromFavorite = useNowtedStore(
    (state) => state.removeFromFavorite
  );
  const { toast } = useToast();
  const router = useRouter();

  const handleAddToFavorite = () => {
    addToFavorite({ id_note: data.id_note, folder_id: data.folder_id });
    toast({
      title: 'Add to favorite Successfully',
      variant: 'success',
    });
    router.refresh();
  };

  const handleRemoveFavorite = () => {
    removeFromFavorite({ id_note: data.id_note, folder_id: data.folder_id });
    toast({
      title: 'Remove from favorite Successfully',
      variant: 'success',
    });
    setFavorites(null);
    router.refresh();
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="focus-visible:ring-0 focus-visible:ring-offset-0 outline-none lg:p-[10px] p-[7px] border-[1px] border-white/[50%] rounded-full">
          <SlOptions />
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
          <DropdownMenuContent className="bg-[#333333] p-[15px] translate-y-4 rounded-xl text-white min-w-[200px] absolute right-0 translate-x-5">
            <div className="flex flex-col gap-[5px]">
              {data?.favorite ? (
                <DropdownMenuItem
                  className="focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]"
                  onClick={() => handleRemoveFavorite()}
                >
                  <div className="flex items-center gap-[15px]">
                    <div className="text-[20px]">
                      <FiStar />
                    </div>
                    <p className="truncate">Remove from favorite</p>
                  </div>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]"
                  onClick={() => handleAddToFavorite()}
                >
                  <div className="flex items-center gap-[15px]">
                    <div className="text-[20px]">
                      <FiStar />
                    </div>
                    <p className="truncate">Add to favorite</p>
                  </div>
                </DropdownMenuItem>
              )}
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
