"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Login, SignUp } from "@/components/AuthPages";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Auth() {
  const [tabValue, setTabValue] = useState("signIn");
  return (
    <Tabs value={tabValue}>
      <TabsList className="grid w-full grid-cols-2 bg-white/[5%]">
        <TabsTrigger value="signIn" onClick={() => setTabValue("signIn")}>
          Sigh in
        </TabsTrigger>
        <TabsTrigger value="signUp" onClick={() => setTabValue("signUp")}>
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
  );
}

export default Auth;
