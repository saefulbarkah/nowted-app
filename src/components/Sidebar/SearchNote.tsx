'use client';
import React, { useState, useMemo, Key } from 'react';
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
import useFolderState from '@/hooks/useFolderState';
import { FolderTypes, NoteTypes } from '@/types';
import { useActiveNote } from '@/store/useActiveNote';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import * as NProgress from 'nprogress';

const RenderNoteItem = ({ title, data, icon, setOpen }: any) => {
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const router = useRouter();

  const setNote = (item: NoteTypes) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setActiveNote(item);
        resolve(1);
      }, 1000);
    });
  };

  const handlePushRoute = async (item: NoteTypes, index: number) => {
    setLoading((state) => ({ ...state, [index]: true }));
    setActiveNote(null);
    NProgress.start();
    router.replace(`/folders/${item.folder_id}`);
    await setNote(item);
    setOpen(false);
    setLoading((state) => ({ ...state, [index]: false }));
    NProgress.done();
  };

  return (
    <React.Fragment>
      {data?.length !== 0 ? (
        <React.Fragment>
          <div className="flex flex-col px-[20px]">
            <div className="flex items-center">
              <p className="inactive-text text-sm pb-1 mr-4">{title}</p>
              <div className="bg-white/[20%] w-full h-[1px]"></div>
            </div>
            {data?.map((item: NoteTypes, i: number) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative ${
                  loading[Number(i)]
                    ? 'opacity-50 cursor-default pointer-events-none'
                    : ''
                } `}
                key={i}
                onClick={() => handlePushRoute(item, i)}
              >
                <div className="flex gap-[20px] items-center">
                  {icon}
                  <p className="truncate">{item.name}</p>
                </div>
                {loading[Number(i)] === true && (
                  <div className="absolute inset-y-0 right-0 flex items-center -translate-x-5">
                    <Loader2 className="animate-spin" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const RenderFolderItem = ({ title, data, icon, setOpen }: any) => {
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const setActiveNote = useActiveNote((state) => state.setActiveNote);

  const router = useRouter();
  const redirectTo = (item: FolderTypes) => {
    NProgress.start();
    return new Promise((resolve) => {
      setTimeout(() => {
        setActiveNote(null);
        router.replace(`/folders/${item.id_folder}`);
        NProgress.done();
        resolve(1);
      }, 1000);
    });
  };

  const handlePushRoute = async (item: FolderTypes, index: number) => {
    setLoading((state) => ({ ...state, [index]: true }));
    await redirectTo(item);
    setOpen(false);
    setLoading((state) => ({ ...state, [index]: false }));
  };
  return (
    <React.Fragment>
      {data?.length !== 0 ? (
        <React.Fragment>
          <div className="flex flex-col px-[20px]">
            <div className="flex items-center">
              <p className="inactive-text text-sm pb-1 mr-4">{title}</p>
              <div className="bg-white/[20%] w-full h-[1px]"></div>
            </div>
            {data?.map((item: FolderTypes, i: number) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative ${
                  loading[Number(i)]
                    ? 'opacity-50 cursor-default pointer-events-none'
                    : ''
                } `}
                key={i}
                onClick={() => handlePushRoute(item, i)}
              >
                <div className="flex gap-[20px] items-center">
                  {icon}
                  <p className="truncate">{item.name}</p>
                </div>
                {loading[Number(i)] === true && (
                  <div className="absolute inset-y-0 right-0 flex items-center -translate-x-5">
                    <Loader2 className="animate-spin" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const RenderNoteOnTrash = ({ title, data, icon, setOpen }: any) => {
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const router = useRouter();

  const setNote = (item: NoteTypes) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setActiveNote(item);
        resolve(1);
      }, 500);
    });
  };

  const handlePushRoute = async (item: NoteTypes, index: number) => {
    NProgress.start();
    router.replace(`/trash`);
    setLoading((state) => ({ ...state, [index]: true }));
    await setNote(item);
    setOpen(false);
    NProgress.done();
    setLoading((state) => ({ ...state, [index]: false }));
  };
  return (
    <React.Fragment>
      {data?.length !== 0 ? (
        <React.Fragment>
          <div className="flex flex-col px-[20px]">
            <div className="flex items-center">
              <p className="inactive-text text-sm pb-1 mr-4">{title}</p>
              <div className="bg-white/[20%] w-full h-[1px]"></div>
            </div>
            {data?.map((item: NoteTypes, i: number) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative ${
                  loading[Number(i)]
                    ? 'opacity-50 cursor-default pointer-events-none'
                    : ''
                } `}
                key={i}
                onClick={() => handlePushRoute(item, i)}
              >
                <div className="flex gap-[20px] items-center">
                  {icon}
                  <p className="truncate">{item.name}</p>
                </div>
                {loading[Number(i)] === true && (
                  <div className="absolute inset-y-0 right-0 flex items-center -translate-x-5">
                    <Loader2 className="animate-spin" />
                  </div>
                )}
              </div>
            ))}
            {data.length === 0 && (
              <p className="text-center text-sm inactive-text">
                Trash is empty
              </p>
            )}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

function SearchNote() {
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const { folders } = useFolderState();

  const searchNoteData = useMemo(() => {
    const findNotes = folders.reduce((results, item) => {
      const filteredData = item.notes.filter((item) => item.deletedAt === null);
      return results.concat(filteredData as []);
    }, []);
    if (!search) return findNotes;
    const res = findNotes.filter((item: NoteTypes) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return res;
  }, [search, folders]);

  const searchFolderData = useMemo(() => {
    if (!search) return folders;
    const res = folders.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return res;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, folders]);

  const searchNoteOnTrash = useMemo(() => {
    const findNotes = folders.reduce((results, item) => {
      const filteredData = item.notes.filter((item) => item.deletedAt !== null);
      return results.concat(filteredData as []);
    }, []);
    if (!search) return findNotes;
    const res = findNotes.filter((item: NoteTypes) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return res;
  }, [search, folders]);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
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
              <AlertDialogCancel asChild onClick={() => setSearch('')}>
                <Button
                  size={'sm'}
                  variant={'ghost'}
                  className="outline-none border-none ring-0 px-[10px] py-[10px]"
                >
                  <FiX className="text-[22px]" />
                </Button>
              </AlertDialogCancel>
            </div>
            <div className="flex flex-col gap-[20px] mt-[20px]">
              <RenderFolderItem
                title="Folders"
                data={searchFolderData}
                icon={<FiFolder className="text-[20px]" />}
                setOpen={setOpen}
              />
              <RenderNoteItem
                title="Notes"
                data={searchNoteData}
                icon={<FiFileText className="text-[20px]" />}
                setOpen={setOpen}
              />
              <RenderNoteOnTrash
                title="Trash"
                data={searchNoteOnTrash}
                icon={<FiFileText className="text-[20px]" />}
                setOpen={setOpen}
              />
            </div>
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
