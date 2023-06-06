import Image from "next/image";
import React from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import { Button } from "../button";
import FolderMenu from "./FolderMenu";
import RecentMenu from "./RecentMenu";
import MoreMenu from "./MoreMenu";

export const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 bottom-0 top-0 w-[300px] custom-scrollbar">
      <div className="flex flex-col gap-[30px] my-[30px]">
        <div className="flex justify-between items-center px-[20px]">
          <div className="relative h-[38px] w-[100px]">
            <Image
              alt="test"
              fill
              src={"/logo.svg"}
              priority
              className="object-contain w-full"
            />
          </div>
          <Button size={"sm"} variant={"ghost"}>
            <FiSearch className="text-[20px]" />
          </Button>
        </div>
        <div className="px-[20px]">
          <Button
            className="w-full text-[16px] font-semibold flex gap-2"
            size={"lg"}
            variant={"secondary"}
          >
            <FiPlus className="text-[20px]" /> <span>New Note</span>
          </Button>
        </div>
        <RecentMenu />
        <FolderMenu />
        <MoreMenu />
      </div>
    </div>
  );
};
