import React from "react";
import UpdateFolder from "./UpdateFolder";
import Link from "next/link";
import { LuFolderOpen } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CgOptions } from "react-icons/cg";
import { FiEdit, FiTrash } from "react-icons/fi";
import useFolderState from "@/hooks/useFolderState";

const DropdownMenuFolder = ({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: JSX.Element;
}) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="focus:text-white cursor-pointer text-white/[60%] focus:bg-white/[5%] py-2"
    >
      {icon}
      <span className="text-[16px]">{label}</span>
    </DropdownMenuItem>
  );
};

function FolderLists() {
  const {
    setDataUpdate,
    setName,
    setEditFolder,
    folders,
    editFolder,
    dataUpdate,
    createFolder,
  } = useFolderState();

  const handleEditFolder = (item: { name: string; id: string | number }) => {
    setDataUpdate({
      id: item.id,
      name: item.name,
    });
    setName(item.name);
    setEditFolder(true);
  };

  return (
    <>
      {folders?.map((item, i) => (
        <div
          className="inactive-text hover:text-white hover:bg-white/[3%] px-[30px] transition rounded-md"
          key={i}
        >
          <div className="flex items-center justify-between">
            {editFolder && item.id === dataUpdate.id ? (
              <UpdateFolder />
            ) : (
              <>
                <Link
                  className="flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px]"
                  href={`/note/folders/${item.id}`}
                >
                  <div>
                    <LuFolderOpen className="text-[20px]" />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="truncate">
                        {item.name}
                      </TooltipTrigger>
                      <TooltipContent className="border border-white/[60%] bg-background text-white">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="outline-none ring-0 border-none"
                    asChild
                  >
                    <Button
                      size={"sm"}
                      variant={"ghost"}
                      className="ring-0 outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <CgOptions className="text-[20px]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-56 border border-white/20">
                    <DropdownMenuFolder
                      icon={<FiEdit className="mr-2 text-[16px]" />}
                      label="Edit Folder"
                      onClick={() => handleEditFolder(item)}
                    />
                    <DropdownMenuFolder
                      icon={<FiTrash className="mr-2 text-[16px]" />}
                      label="Delete Folder"
                      onClick={() => alert("Delete folder")}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      ))}
      {folders.length === 0 && createFolder === false && (
        <p className="px-[30px] text-center text-sm">Folder is empty</p>
      )}
    </>
  );
}

export default FolderLists;
