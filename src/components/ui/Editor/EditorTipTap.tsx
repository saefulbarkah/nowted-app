'use client';
import { Editor, EditorContent } from '@tiptap/react';
import './editor.css';

export const EditorTipTap = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};
