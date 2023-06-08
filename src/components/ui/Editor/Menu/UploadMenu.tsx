import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Base64, decode } from "js-base64";
import { PropsEditor } from "../EditorToolbar";
import { Button } from "../../button";
import { FiImage } from "react-icons/fi";

type imageTypesState = {
  source: string;
  alt: string;
};

function UploadMenu({ editor }: PropsEditor) {
  if (!editor) return;
  const uploadRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<imageTypesState>({
    source: "",
    alt: "",
  });

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
        size={"sm"}
        variant={"ghost"}
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
