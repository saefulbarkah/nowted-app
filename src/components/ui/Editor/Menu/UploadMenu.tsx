import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { PropsEditor } from '../EditorToolbar';
import { Button } from '../../button';
import { FiImage } from 'react-icons/fi';

type imageTypesState = {
  source: string;
  alt: string;
};

function UploadMenu({ editor }: PropsEditor) {
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<imageTypesState>({
    source: '',
    alt: '',
  });
  if (!editor) return;

  const handleUploadImages = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setTimeout(() => {
          editor
            .chain()
            .focus()
            .setImage({
              src: `${base64String}`,
            })
            .run();
        }, 500);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <>
      <input
        type="file"
        className="invisible absolute pointer-events-none"
        ref={uploadRef}
        onChangeCapture={(e) => handleUploadImages(e)}
      />
      <Button
        className="p-[7px]"
        size={'sm'}
        variant={'ghost'}
        onClick={() => {
          if (uploadRef.current) {
            uploadRef.current.click();
          }
        }}
      >
        <FiImage className="text-[20px]" />
      </Button>
    </>
  );
}

export default UploadMenu;
