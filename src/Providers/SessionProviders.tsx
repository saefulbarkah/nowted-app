'use client';
import { SessionProvider } from 'next-auth/react';
import React, { FC, PropsWithChildren } from 'react';

const SessionProviders: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviders;
