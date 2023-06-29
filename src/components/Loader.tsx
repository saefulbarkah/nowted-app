'use client';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const NonSSRWrapper = ({ children }: React.PropsWithChildren) => (
  <>{children}</>
);
export const InitialLoadingPage = dynamic(
  () => Promise.resolve(NonSSRWrapper),
  {
    loading: () => (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-[40px] w-[40px] animate-spin" />
      </div>
    ),
    ssr: false,
  }
);
