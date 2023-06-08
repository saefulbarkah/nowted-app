import React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { SlOptions } from "react-icons/sl";
import Link from "next/link";
import { FiArchive, FiStar, FiTrash } from "react-icons/fi";
import { MoreType } from "../Sidebar/MoreMenu";
import Dvider from "../ui/Dvider";

function NoteMenuList() {
  const more: MoreType = [
    { name: "Favorites", href: "/favorites", icon: <FiStar /> },
    { name: "Archived Notes", href: "/archived-notes", icon: <FiArchive /> },
    { name: "Delete", href: "/trash", icon: <FiTrash /> },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Button
            className="rounded-full border-[2px] border-white/[50%] p-0 h-[40px] w-[40px]"
            variant={"ghost"}
          >
            <SlOptions />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#333333] p-[15px] translate-y-2 rounded-xl text-white w-[202px] absolute right-0 translate-x-5">
          <div className="flex flex-col gap-[15px]">
            {more.map((item, i) => (
              <React.Fragment key={i}>
                {i === 2 && <Dvider />}
                <DropdownMenuItem className="focus:bg-transparent focus:text-white text-white/[50%] cursor-pointer text-[16px]">
                  <Link href={"#"}>
                    <div className="flex items-center gap-[15px]">
                      <div className="text-[20px]">{item.icon}</div>
                      <p className="truncate">{item.name}</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </React.Fragment>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default NoteMenuList;
