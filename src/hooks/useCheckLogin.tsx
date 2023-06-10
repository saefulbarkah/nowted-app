import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
async function useCheckLogin() {
  const supabaseServer = createServerComponentClient({ cookies });
  const getSession = await supabaseServer.auth.getSession();
  const getUser = await supabaseServer.auth.getUser();
  const session = getSession.data.session;
  const user = getUser.data.user;
  return { session, user };
}

export default useCheckLogin;
