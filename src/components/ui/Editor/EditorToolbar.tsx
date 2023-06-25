import React from 'react';
import { Editor } from '@tiptap/react';
import Dvider from '../Dvider';
import ParagraphMenu from './Menu/ParagraphMenu';
import ToggleMenus from './Menu/ToggleMenus';
import UploadMenu from './Menu/UploadMenu';
import LinkMenu from './Menu/LinkMenu';
import { Button } from '../button';
import useSaveNote from '@/hooks/useSaveNote';
import { useSearchParams } from 'next/navigation';
import useNote from '@/hooks/useNote';

export type PropsEditor = {
  editor?: Editor | null;
};

function EditorToolbar({ editor }: PropsEditor) {
  const searchParams = useSearchParams();
  const getFolderId = searchParams.get('folder_id');
  const currentNoteId = searchParams.get('note_id');
  const { note } = useNote({
    find: { note_id: currentNoteId!, folder_id: getFolderId! },
  });
  const { handleSaveTitle, onSave } = useSaveNote({
    folder_id: getFolderId,
    id_note: currentNoteId!,
    name: note?.name,
    content: editor?.getHTML(),
  });
  if (!editor) {
    return;
  }
  return (
    <div className="flex flex-col gap-[10px] mb-[10px]">
      <Dvider />
      <div className="flex gap-[30px] items-center">
        <ParagraphMenu editor={editor} />
        <ToggleMenus editor={editor} />
        <div className="flex gap-[5px] items-center">
          <UploadMenu editor={editor} />
          <LinkMenu editor={editor} />
        </div>
        <Button
          variant={'default'}
          size={'sm'}
          isLoading={onSave}
          onClick={() => handleSaveTitle()}
        >
          {onSave ? <span>Saving changes...</span> : <span>Save changes</span>}
        </Button>
      </div>
      <Dvider />
    </div>
  );
}

export default EditorToolbar;
