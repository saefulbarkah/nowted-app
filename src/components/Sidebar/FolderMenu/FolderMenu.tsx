"use client";
import FolderLists from "./FolderLists";
import CreateFolder from "./CreateFolder";
import CreateOrUpdateFolder from "./CreateOrUpdateFolder";

const FolderMenu: React.FC = () => {
  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">Folders</p>
        <CreateOrUpdateFolder />
      </div>
      <div className="flex flex-col gap-[5px]">
        <CreateFolder />
        <FolderLists />
      </div>
    </div>
  );
};

export default FolderMenu;
