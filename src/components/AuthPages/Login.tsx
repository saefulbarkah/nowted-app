"use client";
import Dvider from "@/components/ui/Dvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import WithProvider from "./WithProvider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loading from "./loading";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSigIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) {
      toast({
        title: "Login Failed",
        description: error?.message,
        variant: "danger",
      });
      return;
    }
    toast({
      title: "Login success",
      variant: "success",
    });
    router.refresh();
  };
  return (
    <>
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
          onClick={() => handleSigIn()}
          disabled={loading ? true : false}
        >
          {loading ? <Loading /> : <p>Login</p>}
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
