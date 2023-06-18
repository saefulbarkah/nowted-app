import React from 'react';
import { Toaster } from '@/components/ui/Toaster';
import { Metadata } from 'next';
import useCheckLogin from '@/hooks/useCheckLogin';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Nowted APP - LOGIN',
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await useCheckLogin();
  if (session?.user) {
    redirect('/note');
  }
  return (
    <div className="px-[30px]">
      {children}
      <Toaster />
    </div>
  );
}
