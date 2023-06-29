import { BubbleMenu, Editor } from '@tiptap/react';
import React from 'react';
import ToggleMenus from './Menu/ToggleMenus';
import LinkMenu from './Menu/LinkMenu';

function BubbleEditor({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <div>
      <BubbleMenu
        editor={editor}
        className="bg-acent-2/75 backdrop-blur-sm flex gap-2 rounded-sm"
      >
        <ToggleMenus editor={editor} />
        <LinkMenu editor={editor} />
      </BubbleMenu>
    </div>
  );
}

export default BubbleEditor;
