import React, { FormEvent, useRef } from "react";
import { PropsEditor } from "../EditorToolbar";
import { Button } from "../../button";
import { FiImage } from "react-icons/fi";

function UploadMenu({ editor }: PropsEditor) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const handleUploadImages = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setTimeout(() => {
          editor!
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
