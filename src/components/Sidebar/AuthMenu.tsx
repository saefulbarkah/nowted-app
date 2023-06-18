'use client';
import React, { FC, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { FiLogOut, FiMoreHorizontal } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { User } from 'next-auth';

interface AuthMenuProps {
  user: User;
}

const AuthMenu: FC<AuthMenuProps> = ({ user }) => {
  const router = useRouter();
  async function handleSignOut() {
    await signOut();
    router.replace('/login');
  }

  return (
    <div className="px-[30px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-[50px] w-full" variant={'ghost'}>
            <div className="flex justify-between gap-2 items-center w-full">
              <div className="flex gap-4 w-[90%] items-center">
                <Image
                  width={30}
                  height={30}
                  src={`${user?.image}`}
                  quality={100}
                  alt="asdsad"
                  className="rounded-full"
                />
                <p className="text-[14px] truncate">{user?.name}</p>
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
              size={'sm'}
              variant={'ghost'}
              className="font-normal flex justify-between"
              onClick={() => handleSignOut()}
            >
              <p>Log Out</p>
              <FiLogOut />
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthMenu;
