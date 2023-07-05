'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import NPprogress from 'nprogress';
import { useRouter } from 'next/navigation';

interface Titem {
  label: string;
  href: string;
}
const NavItem = ({ href, label }: Titem) => {
  const pathName = usePathname();
  return (
    <>
      <Link
        href={href.toLowerCase()}
        className={`${
          pathName === href
            ? 'text-white font-medium'
            : 'inactive-text font-normal'
        } hover:text-white transition-all `}
      >
        {label}
      </Link>
    </>
  );
};

export const Navbar = () => {
  const router = useRouter();
  const [blur, setBlur] = React.useState(false);

  const navMenus = [
    { label: 'Home', path: '/' },
    { label: 'Product', path: '#product' },
    { label: 'Support', path: '#Support' },
    { label: 'Contact Us', path: '#Contact' },
  ];

  const handleToNextRoute = () => {
    NPprogress.start();
    setTimeout(() => {
      router.push('/app');
      NPprogress.done();
    }, 1000);
  };

  const navRef = React.useRef<HTMLDivElement>(null);
  const handleBlur = () => {
    if (window.pageYOffset > 60) return setBlur(true);
    return setBlur(false);
  };
  React.useEffect(() => {
    window.addEventListener('scroll', handleBlur);
    return () => {
      window.removeEventListener('scroll', handleBlur);
    };
  }, []);

  return (
    <>
      <div className="absolute w-full h-full top-0 -z-50 select-none pointer-events-none">
        <Image
          alt="test"
          fill
          src={'/radial-blur-blue.svg'}
          priority
          className="object-cover w-full"
        />
      </div>
      <div
        className={`sticky top-0 mt-[58px] w-[1140px] mx-auto z-50 py-[20px] ${
          blur ? 'backdrop-blur-sm bg-background/30' : ''
        }`}
        ref={navRef}
      >
        <div className="flex justify-between items-center">
          <div className="relative h-[38px] w-[100px]">
            <Image
              alt="test"
              fill
              src={'/logo.svg'}
              priority
              className="object-contain w-full"
            />
          </div>
          <div className="flex gap-[50px]">
            {navMenus.map((item, i) => (
              <NavItem href={item.path} label={item.label} key={i} />
            ))}
          </div>
          <div className="flex gap-[50px]">
            <Button
              variant={'secondary'}
              size={'lg'}
              className="font-bold"
              onClick={() => handleToNextRoute()}
            >
              Try now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
