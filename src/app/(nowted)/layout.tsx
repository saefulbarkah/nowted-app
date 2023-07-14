import NextTopLoader from 'nextjs-toploader';
import { Source_Sans_Pro } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';
import Sidebar from '@/components/Sidebar/Sidebar';
import { InitialLoadingPage } from '@/components/Loader';
import '../globals.css';
import { HeaderMobile } from '@/components/Mobile/Header';
import { Animate } from '@/components/Animate';

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
          <NextTopLoader color="#F86F03" />
          <div className="lg:w-[calc(100vw-300px)] lg:ml-auto">
            <Sidebar />
            <Animate>
              <div className="lg:flex">{children}</div>
            </Animate>
          </div>
          <Toaster />
        </InitialLoadingPage>
      </body>
    </html>
  );
}
