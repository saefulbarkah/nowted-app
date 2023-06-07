"use client";
import { LuFolderOpen } from "react-icons/lu";
import { FiEdit, FiFolderPlus, FiSave, FiTrash, FiX } from "react-icons/fi";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useFolder } from "@/store/store";
import useValidateName from "@/hooks/useValidateName";
import { useToast } from "../ui/use-toast";
import { CgOptions } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

const FolderMenu: React.FC = () => {
  const [name, setName] = useState<string>("My New Folder");
  const folders = useFolder((state) => state.folders);
  const addFolder = useFolder((state) => state.addFolder);
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const { isError } = useValidateName({ data: name });
  const { toast } = useToast();

  const handleAddFolder = () => {
    if (isError) {
      toast({
        title: "Error",
        description: "Folder name is required",
        variant: "danger",
      });
      return;
    }

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

  const RenderButtonCreateFolder = () => {
    return (
      <>
        {createFolder ? (
          <div className="flex">
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => handleAddFolder()}
              className="px-2 py-2"
            >
              <FiSave className="text-[20px]" />
            </Button>
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => setCreateFolder(false)}
              className="px-2 py-2"
            >
              <FiX className="text-[20px]" />
            </Button>
          </div>
        ) : (
          <>
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => setCreateFolder(true)}
            >
              <FiFolderPlus className="text-[20px]" />
            </Button>
          </>
        )}
      </>
    );
  };

  const RenderCreateFolder = () => {
    return (
      <>
        {createFolder && (
          <div className="flex items-center gap-[15px] px-[30px] py-[10px]">
            <div>
              <LuFolderOpen className="text-[20px]" />
            </div>
            <div className="relative">
              <input
                type="text"
                defaultValue={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                className={`bg-transparent outline outline-white/[5%] rounded w-auto ${
                  isError && "border border-red-500"
                }`}
              />
              <div
                className={`absolute transition-all ${
                  isError
                    ? "inset-0 -translate-y-6 text-[14px] text-red-500 opacity-100"
                    : "opacity-0 translate-y-0"
                }`}
              >
                <p>*Folder Name is required</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const RenderFolderLists = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">Folders</p>
        <RenderButtonCreateFolder />
      </div>
      <div className="flex flex-col gap-[5px]">
        <RenderCreateFolder />
        <RenderFolderLists />
      </div>
    </div>
  );
};

export default FolderMenu;
