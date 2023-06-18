import useCheckLogin from '@/hooks/useCheckLogin';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { session } = await useCheckLogin();
  if (!session?.user) {
    redirect('/login');
  }
  redirect('/note');
}
