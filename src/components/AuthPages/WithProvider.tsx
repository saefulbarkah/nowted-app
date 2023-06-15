'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

function WithProvider() {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();

  async function handleSignGoogle() {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      router.push('/note');
    } catch (error) {
      toast({
        title: 'There was a problem',
        description: 'There was an error loggin in with google',
        variant: 'danger',
      });
    }
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
