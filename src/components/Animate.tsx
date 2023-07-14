'use client';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

export const Animate = ({ children }: React.PropsWithChildren) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};
