import { Home } from '@/features/LandingPages/Home';
import { Metadata } from 'next';
import React from 'react';

export default function page() {
  return <Home />;
}
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
