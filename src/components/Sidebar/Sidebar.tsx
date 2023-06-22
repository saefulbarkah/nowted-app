'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Button } from '../ui/button';
import FolderMenu from './FolderMenu/FolderMenu';
import RecentMenu from './RecentMenu';
import MoreMenu from './MoreMenu';
import SearchNote from './SearchNote';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNowtedStore } from '@/store';
import { useToast } from '../ui/use-toast';
import useFolderState from '@/hooks/useFolderState';
import { NoteTypes } from '@/types';
import { slug } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const addNote = useNowtedStore((state) => state.addNote);
  const [isLoading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const folder_id = searchParams.get('folder_id');
  const { toast } = useToast();
  const router = useRouter();
  const { folders } = useFolderState();

  const addingNewNotes = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        addNote({ id_folder: folder_id });
        resolve(1);
      }, 1000);
    });
  };

  const handleCreateNote = async () => {
    setLoading(true);
    await addingNewNotes();
    if (!folder_id) {
      const folder = folders.slice(-1)[0];
      const notes = folder.notes as NoteTypes[];
      const item = notes[0];
      router.push(
        `/note/${slug(item.name)}?note_id=${item.id_note}&folder_id=${
          folder.id_folder
        }`
      );
      setLoading(false);
      toast({
        title: 'Note succesfully created',
        variant: 'success',
      });
      return;
    }
    const getFolder = folders.find((item) => item.id_folder === folder_id);
    setLoading(false);
    toast({
      title: 'Note succesfully created',
      variant: 'success',
    });
    const notes = getFolder!.notes as NoteTypes[];
    const data = notes[0];
    router.push(
      `/note/${slug(data.name)}?note_id=${data.id_note}&folder_id=${
        getFolder!.id_folder
      }`
    );
  };
  return (
    <div className="fixed left-0 bottom-0 top-0 w-[300px] custom-scrollbar">
      <div className="flex flex-col gap-[30px] my-[30px]">
        <div className="flex justify-between items-center px-[20px]">
          <div className="relative h-[38px] w-[100px]">
            <Image
              alt="test"
              fill
              src={'/logo.svg'}
              priority
              className="object-contain w-full"
            />
          </div>
          <SearchNote />
        </div>
        <div className="px-[20px]">
          <Button
            className="w-full text-[16px] font-semibold"
            size={'lg'}
            isLoading={isLoading}
            variant={'secondary'}
            onClick={() => handleCreateNote()}
          >
            {isLoading ? null : <FiPlus className="text-[20px] mr-2" />}
            <span>New Note</span>
          </Button>
        </div>
        <RecentMenu />
        <FolderMenu />
        <MoreMenu />
      </div>
    </div>
  );
};
