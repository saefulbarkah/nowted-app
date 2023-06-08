import React from "react";
import { Button } from "../../button";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";
import { PropsEditor } from "../EditorToolbar";

function ToggleMenus({ editor }: PropsEditor) {
  const isBold = editor?.isActive("bold");
  const isItalic = editor?.isActive("italic");
  const isUnderline = editor?.isActive("underline");
  return (
    <div className="flex gap-[2px] items-center">
      <Button
        variant={isBold ? "secondary" : "ghost"}
        size={"sm"}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <FiBold
          className={`text-[20px] ${
            isBold ? "text-white" : "text-white/[70%]"
          }`}
        />
      </Button>
      <Button
        variant={isItalic ? "secondary" : "ghost"}
        size={"sm"}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <FiItalic
          className={`text-[20px] ${
            isItalic ? "text-white" : "text-white/[70%]"
          }`}
        />
      </Button>
      <Button
        variant={isUnderline ? "secondary" : "ghost"}
        size={"sm"}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <FiUnderline
          className={`text-[20px] ${
            isUnderline ? "text-white" : "text-white/[70%]"
          }`}
        />
      </Button>
    </div>
  );
}

export default ToggleMenus;
