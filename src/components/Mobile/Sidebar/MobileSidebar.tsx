import CreateNote from '@/components/Sidebar/CreateNote';
import FolderMenu from '@/components/Sidebar/FolderMenu/FolderMenu';
import MoreMenu from '@/components/Sidebar/MoreMenu';
import RecentMenu from '@/components/Sidebar/RecentMenu/RecentMenu';
import SearchNote from '@/components/Sidebar/SearchNote';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { create } from 'zustand';
import { HeaderMobile } from '../Header';

interface TSidebar {
  open: boolean;
  toggleSidebar: () => void;
  setOpen: (status: boolean) => void;
}

export const useSidebar = create<TSidebar>((set) => ({
  open: false,
  toggleSidebar: () => set((state) => ({ open: !state.open })),
  setOpen: (status) => set({ open: status }),
}));

export const MobileSidebar = () => {
  const isOpen = useSidebar((state) => state.open);
  const setOpen = useSidebar((state) => state.setOpen);
  return (
    <>
      <HeaderMobile>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', bounce: 0 }}
                exit={{ opacity: 0 }}
                className="fixed h-screen w-full z-[999] inset-0 bg-black/80"
                onClick={() => setOpen(false)}
              ></motion.div>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', bounce: 0 }}
                exit={{ x: '-100%' }}
                className="lg:hidden block fixed left-0 bottom-0 top-0 w-[300px] custom-scrollbar z-[999999] bg-background"
              >
                <div className="flex flex-col gap-[30px] my-[30px]">
                  <div className="flex justify-between items-center px-[20px]">
                    <div className="relative h-[38px] w-[100px]">
                      <Image
                        alt="test"
                        fill
                        src={'/logo.svg'}
                        priority
                        className="object-contain w-full"
                      />
                    </div>
                    <SearchNote />
                  </div>
                  <CreateNote />
                  <RecentMenu />
                  <FolderMenu />
                  <MoreMenu />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </HeaderMobile>
    </>
  );
};
