import { authOption } from '@/lib/nextauth/config';
import { Session, User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
interface returnProps {
  session: Session | null;
}
async function useCheckLogin(): Promise<returnProps> {
  const session = await getServerSession(authOption);
  return { session };
}

export default useCheckLogin;
