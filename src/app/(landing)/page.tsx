import { Home } from '@/features/LandingPages/Home';
import { Metadata } from 'next';
import React from 'react';

export default function page() {
  return <Home />;
}

export const metadata: Metadata = {
  title: 'Nowted APP',
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
