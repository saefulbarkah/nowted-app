import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useNowtedStore } from '@/store';
import { NoteTypes } from '@/types';
import Placeholder from '@tiptap/extension-placeholder';

interface Tprops {
  data: NoteTypes;
}

function useNoteEditor({ data }: Tprops) {
  const saveContent = useNowtedStore((state) => state.saveContent);
  return useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'paragraph',
          },
        },
        heading: {
          HTMLAttributes: {
            class: 'heading-text',
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
      Placeholder.configure({
        emptyNodeClass: 'is-editor-empty',
        placeholder: 'Write here what you want.....',
        showOnlyCurrent: true,
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
          'oultine-none min-h-[300px] mt-[30px] mb-[75px] px-2 border-none outline-none ring-0 prose prose-invert max-w-full',
        spellcheck: 'false',
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      saveContent({
        folder_id: data.folder_id,
        id_note: data.id_note,
        content: content,
      });
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
  });
}

export default useNoteEditor;
