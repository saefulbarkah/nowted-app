'use client';
import { useActiveNote } from '@/store/useActiveNote';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { useNowtedStore } from '@/store';
import { useToast } from '../ui/use-toast';
import { create } from 'zustand';
import { NoteTypes } from '@/types';

interface SProps {
  trashActive: NoteTypes | null;
  setTrashActive: (data: any) => void;
}

export const useTrashActive = create<SProps>((set) => ({
  trashActive: null,
  setTrashActive: (data) => set(() => ({ trashActive: data })),
}));

type DeleteState = {
  isRestoring?: boolean | false;
  isDeleting?: boolean | false;
};

function TrashMenu() {
  const [loading, setLoading] = React.useState<DeleteState>();
  const restore = useNowtedStore((state) => state.restoreNote);
  const deleteNotePermanently = useNowtedStore(
    (state) => state.deleteNotePermanently
  );
  const trashActive = useTrashActive((state) => state.trashActive);
  const setTrashActive = useTrashActive((state) => state.setTrashActive);
  const { toast } = useToast();

  function restoringNote() {
    return new Promise((resolve) => {
      setTimeout(() => {
        restore({
          id_note: trashActive?.id_note as string,
          folder_id: trashActive?.folder_id as string,
        });
        resolve(1);
      }, 1500);
    });
  }

  function deleteNote() {
    return new Promise((resolve) => {
      setTimeout(() => {
        deleteNotePermanently({
          id_note: trashActive?.id_note as string,
          folder_id: trashActive?.folder_id as string,
        });
        resolve(1);
      }, 1500);
    });
  }

  async function restoreNote() {
    setLoading({ isRestoring: true });
    await restoringNote();
    toast({
      title: 'Note succesfully restored',
      variant: 'success',
    });
    setLoading({ isRestoring: false });
    setTrashActive(null);
  }

  const deletePermanently = async () => {
    setLoading({ isDeleting: true });
    await deleteNote();
    setLoading({ isDeleting: false });
    toast({
      title: 'Note succesfully deleted',
      variant: 'success',
    });
    setTrashActive(null);
  };

  return (
    <>
      {!trashActive && (
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
      )}

      {trashActive && (
        <div className="flex flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]">
          <Image
            alt="icon"
            priority
            src={'/history.svg'}
            height={80}
            width={80}
          />
          <h2 className="font-semibold text-[28px] break-words w-[600px] text-center">
            Restore "<span>{`${trashActive.name}`}</span>"
          </h2>
          <p className="w-[460px] text-center font-normal text-white/[60%]">
            Don't want to lose this note? It's not too late! Just click the
            'Restore' button and it will be added back to your list. It's that
            simple.
          </p>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => restoreNote()}
              isLoading={loading?.isRestoring}
            >
              Restore
            </Button>
            <Button
              onClick={() => deletePermanently()}
              isLoading={loading?.isDeleting}
              variant={'destructive'}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default TrashMenu;
