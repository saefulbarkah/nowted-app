import React from 'react';
import useCheckLogin from '@/hooks/useCheckLogin';
import { User } from 'next-auth';
import { getNotes } from '@/lib/api';
import Lists from './Lists';
import { useQuery } from '@tanstack/react-query';

export const NoteMenu = async () => {
  const { session } = await useCheckLogin();

  return (
    <div className="fixed top-0 left-0 bottom-0 ml-[305px] w-[350px] custom-scrollbar bg-foreColor/80">
      <div className="flex flex-col h-full my-[30px] px-[20px]">
        <Lists user={session!.user} />
      </div>
    </div>
  );
};
