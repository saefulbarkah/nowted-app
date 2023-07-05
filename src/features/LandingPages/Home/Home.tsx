'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { FiArrowRight, FiLock, FiRefreshCcw } from 'react-icons/fi';
import NPprogress from 'nprogress';
import { useRouter } from 'next/navigation';

export const Home = () => {
  const router = useRouter();
  const handleToNextRoute = () => {
    NPprogress.start();
    setTimeout(() => {
      router.push('/app');
      NPprogress.done();
    }, 1000);
  };
  return (
    <>
      <section className="mt-[128px] w-[992px] mx-auto">
        <div className="flex flex-col gap-[30px]  items-center">
          <h2 className="text-[40px] text-center leading-normal font-light">
            Boost your productivity with our{' '}
            <span className="font-medium">streamlined note-taking</span>{' '}
            solution
          </h2>
          <p className="text-center inactive-text w-[556px] text-lg">
            Effortlessly access your notes from any device with our convenient
            cloud-based solution.
          </p>
          <Button
            className="h-[55px] py-[15px] px-[30px]"
            onClick={() => handleToNextRoute()}
          >
            <div className="flex gap-[20px] items-center justify-center">
              <p className="font-semibold text-center">Try for free</p>
              <FiArrowRight className="h-[24px] w-[24px]" />
            </div>
          </Button>
        </div>
      </section>
      <section className="mt-[72px] relative">
        <div className="absolute radial-blur-circle w-full border h-full" />
        <div className="relative w-full h-[770px] bg-white/[3%] rounded-[18px] backdrop-blur-md px-[30px]">
          <div className="flex items-center py-[13px]">
            <div className="flex gap-[5px]">
              <div className="bg-[#FF007A] rounded-full w-[10px] h-[10px]"></div>
              <div className="bg-[#FFE600] rounded-full w-[10px] h-[10px]"></div>
              <div className="bg-[#05FF00] rounded-full w-[10px] h-[10px]"></div>
            </div>
            <div className="flex mx-auto items-center justify-between bg-white/[5%] backdrop-blur-sm py-[10px] px-[15px] w-[358px] rounded-[6px]">
              <div className="flex items-center gap-[10px]">
                <FiLock className="opacity-[40%]" />
                <p className="text-[10px]">https://nowted-web.vercel.app/</p>
              </div>
              <FiRefreshCcw />
            </div>
          </div>
          <Image
            src={'/product.png'}
            alt="test"
            width={946}
            height={672}
            unoptimized
            priority
          />
        </div>
      </section>
    </>
  );
};
