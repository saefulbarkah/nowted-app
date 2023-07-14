import React from 'react';
import { Metadata } from 'next';
import { FolderOpen } from 'lucide-react';
const APP_NAME = 'Nowted APP';
export const metadata: Metadata = {
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },

  themeColor: '#FFFFFF',
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/apple-touch-icon.png' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
  ],
  keywords: [
    'nowted-app',
    'notes applications',
    'notes website',
    'nowted-web',
    'noteslists',
    'notes',
    'sticky notes',
    'notes online',
  ],
};
function page() {
  return (
    <>
      <div className="flex flex-col gap-[10px] items-center justify-center h-[calc(100vh-60px)] w-full lg:h-screen">
        <FolderOpen className="h-[50px] w-[50px]" />
        <h2 className="font-semibold text-[28px]">
          Select Folder to view note list
        </h2>
        <p className="lg:w-[460px] text-center font-normal text-white/[60%] text-sm lg:text-base">
          Choose a folder from the menu on the left to view its notes, or create
          a new folder to add to your collection.
        </p>
      </div>
    </>
  );
}

export default page;
