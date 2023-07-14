import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useFavoriteActive } from '../Favorites';
import { MenuListsProps } from '../MenuLists';
import { useActiveNote } from '@/store/useActiveNote';

export const MenuListsMobile = ({ children, title }: MenuListsProps) => {
  const favoriteActive = useFavoriteActive((state) => state.favoriteActive);
  const activeNote = useActiveNote((state) => state.activeNote);

  return (
    <>
      {!favoriteActive && !activeNote ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="overflow-y-auto lg:w-[350px] lg:h-screen h-[calc(100vh-60px)] bg-acent-2 px-5 pb-[23px]">
            <div className="sticky top-0 h-24 flex items-center bg-acent-2 z-[10]">
              <div className="font-semibold max-w-full text-[22px]">
                {title}
              </div>
            </div>
            {children}
          </div>
        </motion.div>
      ) : null}
    </>
  );
};
