'use client';
import React, { useState, useMemo } from 'react';
import { Button } from '../ui/button';
import { FiFolder, FiSearch, FiX } from 'react-icons/fi';
import { FiFileText } from 'react-icons/fi';
import useFolderState from '@/hooks/useFolderState';
import { FolderTypes, NoteTypes } from '@/types';
import { useActiveNote } from '@/store/useActiveNote';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import * as NProgress from 'nprogress';
import { create } from 'zustand';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { AiFillStar } from 'react-icons/ai';

interface TSearch {
  search: string;
  setSearch: (value: string) => void;
  clearSearch: () => void;
}

interface Twait {
  isWaiting: boolean;
  setWaiting: (value: boolean) => void;
}

interface TLoading {
  loading: Record<string | number, boolean>;
  setLoading: (id: string | number) => void;
  doneLoading: () => void;
}

const useSearchState = create<TSearch & Twait & TLoading>((set) => ({
  search: '',
  setSearch: (val) => set(() => ({ search: val })),
  clearSearch: () => set({ search: '' }),

  isWaiting: false,
  setWaiting: (status) => set({ isWaiting: status }),

  loading: {},
  setLoading: (id) =>
    set((state) => ({ loading: { ...state.loading, [id]: true } })),
  doneLoading: () => set({ loading: {} }),
}));

const useSearchStateHook = () => {
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const clearSearch = useSearchState((state) => state.clearSearch);
  const isWaiting = useSearchState((state) => state.isWaiting);
  const setWaiting = useSearchState((state) => state.setWaiting);
  const loading = useSearchState((state) => state.loading);
  const setLoading = useSearchState((state) => state.setLoading);
  const doneLoading = useSearchState((state) => state.doneLoading);
  return {
    setActiveNote,
    clearSearch,
    isWaiting,
    setWaiting,
    loading,
    setLoading,
    doneLoading,
  };
};

const RenderNoteItem = ({ title, data, icon, setOpen }: any) => {
  const {
    setActiveNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook();
  const router = useRouter();

  const setNote = (item: NoteTypes) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setActiveNote(item);
        resolve(1);
      }, 1000);
    });
  };

  const handlePushRoute = async (item: NoteTypes) => {
    setLoading(item.id_note);
    setActiveNote(null);
    setWaiting(true);
    NProgress.start();
    router.replace(`/app/folders/${item.folder_id}`);
    await setNote(item);
    setOpen(false);
    setWaiting(false);
    doneLoading();
    NProgress.done();
    clearSearch();
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
                  loading[item.id_note] && item.deletedAt === null
                    ? 'opacity-50'
                    : ''
                } ${isWaiting && 'pointer-events-none cursor-default'} `}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className="flex gap-[20px] items-center">
                  {icon}
                  <p className="truncate lg:text-base text-sm">{item.name}</p>
                  {item.favorite && (
                    <AiFillStar className="h-4 w-4 text-yellow-300" />
                  )}
                </div>
                {loading[item.id_note] && item.deletedAt === null && (
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
  const {
    setActiveNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook();
  const router = useRouter();

  const redirectTo = (item: FolderTypes) => {
    NProgress.start();
    return new Promise((resolve) => {
      setTimeout(() => {
        setActiveNote(null);
        router.replace(`/app/folders/${item.id_folder}`);
        NProgress.done();
        resolve(1);
      }, 1000);
    });
  };

  const handlePushRoute = async (item: FolderTypes) => {
    setLoading(item.id_folder);
    setWaiting(true);
    await redirectTo(item);
    setOpen(false);
    setWaiting(false);
    doneLoading();
    clearSearch();
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
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative  ${
                  loading[item.id_folder] ? 'opacity-50' : ''
                } ${isWaiting && 'pointer-events-none cursor-default'} `}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className="flex gap-[20px] items-center">
                  {icon}
                  <p className="truncate lg:text-base text-sm">{item.name}</p>
                </div>
                {loading[item.id_folder] === true && (
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
  const {
    setActiveNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook();

  const router = useRouter();
  const setNote = (item: NoteTypes) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setActiveNote(item);
        resolve(1);
      }, 500);
    });
  };

  const handlePushRoute = async (item: NoteTypes) => {
    NProgress.start();
    router.replace(`/app/trash`);
    setLoading(item.id_note as string);
    setWaiting(true);
    await setNote(item);
    setOpen(false);
    NProgress.done();
    doneLoading();
    clearSearch();
    setWaiting(false);
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
                  loading[item.id_note] && item.deletedAt !== null
                    ? 'opacity-50'
                    : ''
                } ${isWaiting && 'cursor-default pointer-events-none'}`}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className="flex gap-[20px] items-center">
                  {icon}
                  <p className="truncate lg:text-base text-sm">{item.name}</p>
                </div>
                {loading[item.id_note] && item.deletedAt !== null && (
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
  const [open, setOpen] = useState<boolean>(false);
  const { folders } = useFolderState();
  const search = useSearchState((state) => state.search);
  const setSearch = useSearchState((state) => state.setSearch);
  const clearSearch = useSearchState((state) => state.clearSearch);

  const searchNoteData = useMemo(() => {
    const findNotes = folders.reduce((results, item) => {
      const filteredData = item.notes.filter((item) => item.deletedAt === null);
      return results.concat(filteredData as []);
    }, []);
    if (!search) {
      const sorting = findNotes.sort((a: NoteTypes, b: NoteTypes) => {
        if (a.favorite === b.favorite) {
          return 0;
        }
        if (a.favorite) {
          return -1;
        }
        return 1;
      });
      return sorting;
    }
    const res = findNotes.filter((item: NoteTypes) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    const sorting = res.sort((a: NoteTypes, b: NoteTypes) => {
      if (a.favorite === b.favorite) {
        return 0;
      }
      if (a.favorite) {
        return -1;
      }
      return 1;
    });
    return sorting;
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'} variant={'ghost'}>
            <FiSearch className="text-[20px]" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 border lg:max-w-[520px] max-w-[350px] border-white/[30%] lg:h-[400px] h-[300px] overflow-auto custom-scrollbar z-50">
          <div>
            <div className="flex justify-between z-50 items-center px-[20px] sticky top-0 right-0 left-0 bg-background border-b border-white/[20%]">
              <div className="flex items-center gap-4 w-full py-[20px]">
                <FiSearch className="text-[20px]" />
                <input
                  type="text"
                  className="w-full bg-background text-white outline-none"
                  placeholder="Type a note or folder....."
                  onChange={(e) => setSearch(e.target.value)}
                  maxLength={30}
                  autoFocus
                  spellCheck={false}
                  autoComplete="false"
                />
              </div>
              <Button
                size={'sm'}
                variant={'ghost'}
                className="outline-none border-none ring-0 px-[10px] py-[10px]"
                onClick={() => {
                  clearSearch();
                  setOpen(false);
                }}
              >
                <FiX className="text-[22px]" />
              </Button>
            </div>
            <div className="flex flex-col gap-[20px] my-[20px] lg:w-full w-[320px] mx-auto">
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
            {searchNoteData.length === 0 &&
              searchFolderData.length === 0 &&
              search && (
                <p className="text-lg flex h-[50%] pt-0 items-center justify-center break-wor ds">
                  <span>No results for</span>
                  <span className="ml-2 font-bold text-white">{search}</span>
                </p>
              )}
            {searchNoteData.length === 0 &&
              searchFolderData.length === 0 &&
              searchNoteOnTrash.length === 0 &&
              !search && (
                <p className="text-lg flex h-[50%] pt-0 items-center justify-center break-wor ds">
                  <span>Data is empty</span>
                </p>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchNote;
