'use client';
import { BubbleMenu, Editor, EditorContent } from '@tiptap/react';
import './editor.css';
import ToggleMenus from './Menu/ToggleMenus';
import LinkMenu from './Menu/LinkMenu';

export const EditorTipTap = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};
