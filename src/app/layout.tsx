import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { Source_Sans_Pro } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';
import Sidebar from '@/components/Sidebar/Sidebar';
import dynamic from 'next/dynamic';

const NonSSRWrapper = ({ children }: React.PropsWithChildren) => (
  <>{children}</>
);

const ComponentWithNoSSR = dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

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
        <NextTopLoader />
        <ComponentWithNoSSR>
          <div className="w-[calc(100vw-300px)] ml-auto">
            <Sidebar />
            <div className="flex">{children}</div>
          </div>
        </ComponentWithNoSSR>
        <Toaster />
      </body>
    </html>
  );
}
