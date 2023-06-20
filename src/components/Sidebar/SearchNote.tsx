'use client';
import React, { useState, useMemo } from 'react';
import { Button } from '../ui/button';
import { FiFolder, FiSearch, FiX } from 'react-icons/fi';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import Link from 'next/link';
import { FiFileText } from 'react-icons/fi';

const RenderNoteItem = ({ title, data, icon }: any) => {
  return (
    <>
      {data.length !== 0 ? (
        <>
          <div className="flex flex-col pt-[25px] px-[20px]">
            <div className="flex items-center">
              <p className="inactive-text text-sm pb-1 mr-4">{title}</p>
              <div className="bg-white/[20%] w-full h-[1px]"></div>
            </div>
            {data?.map((item: any, i: any) => (
              <Link
                href={'#'}
                className="hover:bg-white/[5%] py-3 rounded-md transition px-3"
                key={i}
              >
                <div className="flex gap-[20px] items-center">
                  {icon}
                  <p className="truncate">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

const RenderFolderItem = ({ title, data, icon }: any) => {
  return (
    <>
      {data.length !== 0 ? (
        <>
          <div className="flex flex-col pt-[25px] px-[20px]">
            <div className="flex items-center">
              <p className="inactive-text text-sm pb-1 mr-4">{title}</p>
              <div className="bg-white/[20%] w-full h-[1px]"></div>
            </div>
            {data?.map((item: any, i: any) => (
              <Link
                href={'#'}
                className="hover:bg-white/[5%] py-3 rounded-md transition px-3"
                key={i}
              >
                <div className="flex gap-[20px] items-center">
                  {icon}
                  <p className="truncate">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

function SearchNote() {
  const [search, setSearch] = useState<string>('');

  const dummyData: {
    notes: {
      title: string;
      category: string;
    }[];
    folders: {
      title: string;
      category: string;
    }[];
  } = {
    notes: [
      { title: 'wedqweqewqasdqweqwewqeqe', category: 'notes' },
      { title: 'loweqweqw eqw eqwewes', category: 'notes' },
    ],
    folders: [
      { title: 'Travel', category: 'folder' },
      { title: 'Home', category: 'folder' },
    ],
  };

  const searchNoteData = useMemo(() => {
    if (!search) return dummyData.notes;
    const res = dummyData.notes.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
    return res;
  }, [search, dummyData.notes]);

  const searchFolderData = useMemo(() => {
    if (!search) return dummyData.folders;
    const res = dummyData.folders.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
    return res;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={'sm'} variant={'ghost'}>
            <FiSearch className="text-[20px]" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-0 border max-w-[520px] border-white/[30%] h-[400px] overflow-hidden overflow-y-auto custom-scrollbar">
          <div>
            <div className="flex justify-between items-center px-[20px] sticky top-0 right-0 left-0 bg-background border-b border-white/[20%]">
              <div className="flex items-center gap-4 w-full  py-[20px]">
                <FiSearch className="text-[20px]" />
                <input
                  type="text"
                  className="w-full bg-background text-white outline-none"
                  placeholder="Type a note or folder....."
                  onChange={(e) => setSearch(e.target.value)}
                  maxLength={30}
                />
              </div>
              <AlertDialogCancel asChild>
                <Button
                  size={'sm'}
                  variant={'ghost'}
                  className="outline-none border-none ring-0 px-[10px] py-[10px]"
                >
                  <FiX className="text-[22px]" />
                </Button>
              </AlertDialogCancel>
            </div>
            <RenderNoteItem
              title="notes"
              data={searchNoteData}
              icon={<FiFileText className="text-[20px]" />}
            />
            <RenderFolderItem
              title="folders"
              data={searchFolderData}
              icon={<FiFolder className="text-[20px]" />}
            />
            {searchNoteData.length === 0 && searchFolderData.length === 0 && (
              <p className="text-lg flex h-[330px] items-center justify-center truncate">
                <span>No results for</span>
                <span className="ml-2 font-bold text-white">{search}</span>
              </p>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SearchNote;
