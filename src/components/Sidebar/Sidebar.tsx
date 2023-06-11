"use client";
import Image from "next/image";
import React from "react";
import { FiLogOut, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { Button } from "../ui/button";
import FolderMenu from "./FolderMenu/FolderMenu";
import RecentMenu from "./RecentMenu";
import MoreMenu from "./MoreMenu";
import SearchNote from "./SearchNote";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => (await supabase.auth.getUser()).data.user,
  });

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/login");
    }
  }

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
          <SearchNote />
        </div>
        <div className="px-[30px]">
          {isLoading ? (
            <Button className="h-[50px] w-full" variant={"ghost"}>
              <div className="flex justify-between gap-2 items-center w-full">
                <div className="flex gap-4 w-[90%] items-center">
                  <Skeleton className="h-[30px] w-[30px] rounded-full" />
                  <Skeleton className="h-[20px] w-[90%]" />
                </div>
              </div>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-[50px] w-full" variant={"ghost"}>
                  <div className="flex justify-between gap-2 items-center w-full">
                    <div className="flex gap-4 w-[90%] items-center">
                      <Image
                        width={30}
                        height={30}
                        src={`${data?.user_metadata.avatar_url}`}
                        quality={100}
                        alt="asdsad"
                        className="rounded-full"
                      />
                      <p className="text-[14px] truncate">
                        {data?.user_metadata.full_name}
                      </p>
                    </div>
                    <div>
                      <FiMoreHorizontal className="text-white text-[20px]" />
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[220px] bg-background border-white/[20%] text-white/[60%]">
                <div className="flex flex-col">
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    className="font-normal flex justify-between"
                    onClick={() => handleSignOut()}
                  >
                    <p>Log Out</p>
                    <FiLogOut />
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
