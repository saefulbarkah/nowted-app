"use client";
import { LuFolderOpen } from "react-icons/lu";
import { FiEdit, FiFolderPlus, FiMenu, FiTrash } from "react-icons/fi";
import Link from "next/link";
import { Button } from "../button";
import { useState } from "react";
import { useFolder } from "@/store/store";
import useValidateName from "@/hooks/useValidateName";
import { useToast } from "../use-toast";
import { ContextMenu } from "@radix-ui/react-context-menu";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../context-menu";
import { CgOptions } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider } from "../tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

const FolderMenu: React.FC = () => {
  const [name, setName] = useState<string>("My New Folder");
  const folders = useFolder((state) => state.folders);
  const addFolder = useFolder((state) => state.addFolder);
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const { isError } = useValidateName({ data: name });
  const { toast } = useToast();

  const handleAddFolder = () => {
    if (isError)
      return toast({
        title: "Error",
        description: "Folder name is required",
        variant: "danger",
      });
    setCreateFolder(false);
    setName("My New Folder");
    addFolder({ name: name });
  };

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

  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">Folders</p>
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={() => setCreateFolder(!createFolder)}
        >
          <FiFolderPlus className="text-[20px]" />
        </Button>
      </div>
      <div className="flex flex-col gap-[5px]">
        {createFolder && (
          <div className="flex items-center gap-[15px] px-[30px] py-[10px]">
            <div>
              <LuFolderOpen className="text-[20px]" />
            </div>
            <input
              type="text"
              defaultValue={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleAddFolder()}
              className={`bg-transparent outline outline-white/[5%] rounded w-auto ${
                isError && "border border-red-500"
              }`}
            />
          </div>
        )}
        {folders?.map((item, i) => (
          <div
            className="inactive-text hover:text-white hover:bg-white/[3%] px-[30px] transition rounded-md"
            key={i}
          >
            <div className="flex items-center justify-between">
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
                <DropdownMenuTrigger className="outline-none">
                  <Button size={"sm"} variant={"ghost"}>
                    <CgOptions className="text-[20px]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background w-56 border border-white/20">
                  <DropdownMenuFolder
                    icon={<FiEdit className="mr-2 text-[16px]" />}
                    label="Edit Folder"
                    onClick={() => alert("Edit folder")}
                  />
                  <DropdownMenuFolder
                    icon={<FiTrash className="mr-2 text-[16px]" />}
                    label="Delete Folder"
                    onClick={() => alert("Delete folder")}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
        {folders.length === 0 && createFolder === false && (
          <p className="px-[30px] text-center text-sm">Folder is empty</p>
        )}
      </div>
    </div>
  );
};

export default FolderMenu;
