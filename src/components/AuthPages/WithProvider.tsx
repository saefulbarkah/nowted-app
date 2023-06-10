"use client";
import React from "react";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

function WithProvider() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleSignGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (!error) router.push("/note");
  }
  return (
    <div className="flex flex-col gap-[20px]">
      <Button
        size={"lg"}
        className="font-semibold border-white/[20%] capitalize"
        variant={"outline"}
        onClick={() => handleSignGoogle()}
      >
        <span className="mr-2">
          <FcGoogle className="text-[18px]" />
        </span>
        <span>Login With google</span>
      </Button>
    </div>
  );
}

export default WithProvider;
