'use client';
import { useActiveNote } from '@/store/useActiveNote';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { useNowtedStore } from '@/store';
import { useToast } from '../ui/use-toast';

function TrashMenu() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const restore = useNowtedStore((state) => state.restoreNote);
  const activeNote = useActiveNote((state) => state.activeNote);
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const { toast } = useToast();

  function restoringNote() {
    return new Promise((resolve) => {
      setTimeout(() => {
        restore({
          id_note: activeNote?.id_note as string,
          folder_id: activeNote?.folder_id as string,
        });
        resolve(1);
      }, 1500);
    });
  }

  async function restoreNote() {
    setLoading(true);
    await restoringNote();
    toast({
      title: 'Note succesfully restored',
      variant: 'success',
    });
    setLoading(false);
    setActiveNote(null);
  }
  if (!activeNote) {
    return (
      <div className="flex flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]">
        <Image
          alt="icon"
          priority
          src={'/FileText.svg'}
          height={80}
          width={80}
        />

        <h2 className="font-semibold text-[28px]">Select note to restore</h2>
        <p className="w-[460px] text-center font-normal text-white/[60%]">
          Select a note from the list on the left for restoring note
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]">
      <Image alt="icon" priority src={'/history.svg'} height={80} width={80} />
      <h2 className="font-semibold text-[28px] break-words w-[600px] text-center">
        Restore "<span>{`${activeNote.name}`}</span>"
      </h2>
      <p className="w-[460px] text-center font-normal text-white/[60%]">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </p>
      <Button onClick={() => restoreNote()} isLoading={loading}>
        Restore
      </Button>
    </div>
  );
}

export default TrashMenu;