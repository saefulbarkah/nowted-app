"use client";
import Dvider from "@/components/ui/Dvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import WithProvider from "./WithProvider";
import Loading from "./loading";

export const SignUp = ({ onChangeTab }: any) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) return;

    // signup success
    onChangeTab("signIn");
  };

  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <Label htmlFor="name-2">Name</Label>
        <Input
          type="text"
          className="border border-white/[15%] focus-visible:ring-indigo-500  placeholder:text-white/[30%]"
          id="name-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <Label htmlFor="email-2">Email</Label>
        <Input
          type="email"
          className="border border-white/[15%] focus-visible:ring-indigo-500  placeholder:text-white/[30%]"
          id="email-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <Label htmlFor="password-2">Password : </Label>
        <Input
          type="password"
          className="border border-white/[15%] focus-visible:ring-indigo-500 text-white  placeholder:text-white/[30%]"
          id="password-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Button
          size={"lg"}
          className="bg-indigo-800 text-lg font-semibold"
          onClick={() => handleSignUp()}
          disabled={loading ? true : false}
        >
          {loading ? <Loading /> : <p>Register</p>}
        </Button>
      </div>
      <div className="flex justify-center gap-[10px] items-center">
        <Dvider />
        <p>OR</p>
        <Dvider />
      </div>
      <WithProvider />
    </>
  );
};
