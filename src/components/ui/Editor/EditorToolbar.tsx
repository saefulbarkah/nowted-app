import React from "react";
import { Editor } from "@tiptap/react";
import Dvider from "../Dvider";
import ParagraphMenu from "./Menu/ParagraphMenu";
import ToggleMenus from "./Menu/ToggleMenus";
import UploadMenu from "./Menu/UploadMenu";
import LinkMenu from "./Menu/LinkMenu";

export type PropsEditor = {
  editor?: Editor | null;
};

function EditorToolbar({ editor }: PropsEditor) {
  const isBold = editor?.isActive("bold");
  return (
    <div className="flex flex-col gap-[10px] mb-[10px]">
      <Dvider />
      <div className="flex gap-[30px] items-center">
        <ParagraphMenu editor={editor} />
        <ToggleMenus editor={editor} />
        <div className="flex gap-[5px] items-center">
          <UploadMenu editor={editor} />
          <LinkMenu editor={editor} />
        </div>
      </div>
      <Dvider />
    </div>
  );
}

export default EditorToolbar;
