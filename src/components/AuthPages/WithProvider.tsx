"use client";
import React from "react";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FcGoogle } from "react-icons/fc";

function WithProvider() {
  const supabase = createClientComponentClient();
  return (
    <div className="flex flex-col gap-[20px]">
      <Button
        size={"lg"}
        className="font-semibold border-white/[20%] capitalize"
        variant={"outline"}
        onClick={() =>
          supabase.auth.signInWithOAuth({
            provider: "google",
          })
        }
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
