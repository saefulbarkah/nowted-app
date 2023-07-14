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
      <div className="px-[20px] lg:px-0">
        <section className="lg:mt-[128px] lg:w-[992px] lg:mx-auto w-full mt-[50px]">
          <div className="flex flex-col gap-[30px] items-center">
            <h2 className="lg:text-[40px] text-[32px] text-center leading-normal font-light">
              Boost your productivity with our{' '}
              <span className="font-medium">streamlined note-taking</span>{' '}
              solution
            </h2>
            <p className="lg:w-[556px] lg:text-lg text-sm text-center inactive-text">
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
          <div className="relative w-full  bg-white/[3%] rounded-[18px] backdrop-blur-md lg:px-[30px] px-[15px] py-[20px]">
            <div className="flex items-center lg:gap-0 gap-5">
              <div className="flex gap-[5px]">
                <div className="bg-[#FF007A] rounded-full w-[10px] h-[10px]"></div>
                <div className="bg-[#FFE600] rounded-full w-[10px] h-[10px]"></div>
                <div className="bg-[#05FF00] rounded-full w-[10px] h-[10px]"></div>
              </div>
              <div className="flex lg:mx-auto items-center justify-between bg-white/[5%] backdrop-blur-sm py-[10px] px-[15px] lg:w-[358px] w-full rounded-[6px]">
                <div className="flex items-center gap-[10px]">
                  <FiLock className="opacity-[40%]" />
                  <p className="text-[10px]">https://nowted-web.vercel.app/</p>
                </div>
                <FiRefreshCcw />
              </div>
            </div>
            <div className="relative h-full w-full mt-[13px]">
              <Image
                src={'/product.png'}
                alt="product"
                fill
                unoptimized
                priority
                className="object-contain w-full !relative h-full"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
