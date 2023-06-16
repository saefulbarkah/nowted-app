'use client';
import { useFolderTitle } from '@/hooks/useNoteLists';
import { useSearchParams } from 'next/navigation';
import React from 'react';

function HeaderNote() {
  const searchParam = useSearchParams();
  const folderName = searchParam.get('folder');
  const title = useFolderTitle((state) => state.title);
  if (!folderName) {
    return <h2 className="text-[22px] font-semibold">{title}</h2>;
  }
  return <h2 className="text-[22px] font-semibold">{folderName}</h2>;
}

export default HeaderNote;
