'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import useFolderState from '@/hooks/useFolderState';
import { useNowtedStore } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecentStore } from '@/store/useRecentStore';
import { NoteTypes } from '@/types';
import { slug } from '@/lib/utils';
import { FiPlus } from 'react-icons/fi';

function CreateNote() {
  const [isLoading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const folder_id = searchParams.get('folder_id');
  const { toast } = useToast();
  const router = useRouter();
  const { folders } = useFolderState();

  const addNote = useNowtedStore((state) => state.addNote);
  const addRecent = useRecentStore((state) => state.addToRecents);

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
      addRecent(item);
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
    addRecent(data);
    router.push(
      `/note/${slug(data.name)}?note_id=${data.id_note}&folder_id=${
        getFolder!.id_folder
      }`
    );
    return;
  };

  return (
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
  );
}

export default CreateNote;
