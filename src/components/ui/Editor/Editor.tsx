'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorToolbar from './EditorToolbar';
import Underline from '@tiptap/extension-underline';
import './editor.css';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

export const Editor = ({ content }: { content?: string | null }) => {
  const Editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'paragraph',
          },
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'image-editor',
        },
        allowBase64: true,
        inline: true,
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'link-custom',
        },
        autolink: false,
        linkOnPaste: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'oultine-none min-h-[300px] mt-[30px] px-2 border-none outline-none ring-0',
      },
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
    content: content,
  });

  return (
    <>
      <EditorToolbar editor={Editor} content={content!} />
      <EditorContent editor={Editor} />
    </>
  );
};
