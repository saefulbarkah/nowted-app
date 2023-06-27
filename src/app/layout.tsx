import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { Source_Sans_Pro } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';
import Sidebar from '@/components/Sidebar/Sidebar';
import { InitialLoadingPage } from '@/components/Loader';

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
    <html lang="en">
      <body className={SourceSansPro.className}>
        <InitialLoadingPage>
          <NextTopLoader />
          <div className="w-[calc(100vw-300px)] ml-auto">
            <Sidebar />
            <div className="flex">{children}</div>
          </div>
          <Toaster />
        </InitialLoadingPage>
      </body>
    </html>
  );
}
