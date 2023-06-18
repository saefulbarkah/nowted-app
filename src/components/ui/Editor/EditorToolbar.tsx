'use client';
import React from 'react';
import { Editor } from '@tiptap/react';
import Dvider from '../Dvider';
import ParagraphMenu from './Menu/ParagraphMenu';
import ToggleMenus from './Menu/ToggleMenus';
import UploadMenu from './Menu/UploadMenu';
import LinkMenu from './Menu/LinkMenu';
import { Skeleton } from '../skeleton';
import { Button } from '../button';
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { noteTypes } from '@/types';
import { getNotesById, saveNotesById } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { useToast } from '../use-toast';

export type PropsEditor = {
  editor?: Editor | null;
  content?: string;
};

function EditorToolbar({ editor }: PropsEditor) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const query = useSearchParams();
  const note_id = query.get('note_id');
  const isMutationNote = useIsMutating({ mutationKey: ['save-note'] });

  const handleSavingNote = async (data: Partial<noteTypes>) => {
    await saveNotesById({ id: data.id, content: editor?.getHTML() });
  };

  const { mutate: handleSaveNote, isLoading } = useMutation(handleSavingNote, {
    mutationKey: ['save-note'],
    onSuccess: async () => {
      await queryClient.invalidateQueries(['find-note']);
      await queryClient.invalidateQueries(['notes']);
      toast({
        title: 'Save note successfully',
        variant: 'success',
      });
    },
  });

  if (!editor) {
    return <Skeleton className="h-[60px] w-full" />;
  }
  return (
    <div className="flex flex-col gap-[10px] mb-[10px]">
      <Dvider />
      <div className="flex gap-[30px] items-center">
        <ParagraphMenu editor={editor!} />
        <ToggleMenus editor={editor!} />
        <div className="flex gap-[5px] items-center">
          <UploadMenu editor={editor!} />
          <LinkMenu editor={editor!} />
        </div>
        <Button
          variant={'default'}
          size={'sm'}
          isLoading={Boolean(isMutationNote)}
          onClick={() => handleSaveNote({ id: Number(note_id)! })}
        >
          {Boolean(isMutationNote) ? (
            <span>Saving changes...</span>
          ) : (
            <span>Save changes</span>
          )}
        </Button>
      </div>
      <Dvider />
    </div>
  );
}

export default EditorToolbar;
