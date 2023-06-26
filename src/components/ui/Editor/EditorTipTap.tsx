'use client';
import { Editor, EditorContent } from '@tiptap/react';

export const EditorTipTap = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};
