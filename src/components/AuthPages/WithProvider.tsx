'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

function WithProvider() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignGoogle() {
    setLoading(true);
    await signIn('google');
  }
  return (
    <div className="flex flex-col gap-[20px]">
      <Button
        size={'lg'}
        className="font-semibold border-white/[20%] capitalize"
        variant={'outline'}
        onClick={() => handleSignGoogle()}
        isLoading={loading}
      >
        {loading ? null : <FcGoogle className="text-[18px] mr-2" />}
        <span>Login With google</span>
      </Button>
    </div>
  );
}

export default WithProvider;
