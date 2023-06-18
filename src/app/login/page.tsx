'use client';
import { Login, SignUp } from '@/components/AuthPages';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function Page() {
  const [TabValue, setTabValue] = useState('signIn');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Tabs value={TabValue}>
        <TabsList className="grid w-full grid-cols-2 bg-white/[5%]">
          <TabsTrigger value="signIn" onClick={() => setTabValue('signIn')}>
            Sigh in
          </TabsTrigger>
          <TabsTrigger value="signUp" onClick={() => setTabValue('signUp')}>
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <Card className="w-[400px] bg-white/[3%] text-white border border-white/[5%]">
            <CardHeader className="text-[32px] font-semibold text-center">
              Sign In
            </CardHeader>
            <CardContent className="flex flex-col gap-[20px]">
              <Login />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signUp">
          <Card className="w-[400px] bg-white/[3%] text-white border border-white/[5%]">
            <CardHeader className="text-[32px] font-semibold text-center">
              Sign Up
            </CardHeader>
            <CardContent className="flex flex-col gap-[20px]">
              <SignUp onChangeTab={setTabValue} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
