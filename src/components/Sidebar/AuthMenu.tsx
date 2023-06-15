'use client';
import { User } from '@supabase/supabase-js';
import React, { FC, useEffect } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { FiLogOut, FiMoreHorizontal } from 'react-icons/fi';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';

interface AuthMenuProps {
  user: User | null;
}

const AuthMenu: FC<AuthMenuProps> = ({ user }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace('/login');
    }
  }

  useEffect(() => {
    setUser(user);
  }, [user]);
  return (
    <div className="px-[30px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-[50px] w-full"
            variant={'ghost'}
          >
            <div className="flex justify-between gap-2 items-center w-full">
              <div className="flex gap-4 w-[90%] items-center">
                <Image
                  width={30}
                  height={30}
                  src={`${user?.user_metadata.avatar_url}`}
                  quality={100}
                  alt="asdsad"
                  className="rounded-full"
                />
                <p className="text-[14px] truncate">{user?.user_metadata.full_name}</p>
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
