import React from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
async function useCheckLogin() {
  const supabaseServer = createServerComponentClient({ cookies });
  const { data } = await supabaseServer.auth.getSession();
  const session = data.session;
  return { session };
}

export default useCheckLogin;
