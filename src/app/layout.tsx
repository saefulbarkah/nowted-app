import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { Source_Sans_Pro } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';
import NoteMenu from '@/components/NoteLists/NoteMenu';
import Sidebar from '@/components/Sidebar/Sidebar';

const SourceSansPro = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={SourceSansPro.className}>
        <NextTopLoader />
        <Sidebar />
        <NoteMenu />
        <div className="relative ml-[655px] custom-scrollbar">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
