import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/features/LandingPages/components';
import { Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Nowted App',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Navbar />
        <div className="max-w-[1024px] mx-auto mb-[149px]">{children}</div>
        <NextTopLoader color="#F86F03" />
      </body>
    </html>
  );
}
