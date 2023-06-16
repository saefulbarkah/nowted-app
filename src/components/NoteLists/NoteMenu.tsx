import React from 'react';
import HeaderNote from './HeaderNote';
import NoteLists from './NoteLists';
import useCheckLogin from '@/hooks/useCheckLogin';

export const NoteMenu = async () => {
  const { user } = await useCheckLogin();
  return (
    <div className="fixed top-0 left-0 bottom-0 ml-[305px] w-[350px] custom-scrollbar bg-foreColor/80">
      <div className="flex flex-col h-full my-[30px] px-[20px]">
        <HeaderNote />
        <NoteLists user={user} />
      </div>
    </div>
  );
};
