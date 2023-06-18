import { Sidebar } from '@/components/Sidebar';
import { NoteMenu } from '@/components/NoteLists';
import { Toaster } from '@/components/ui/Toaster';
import ReactQueryProvider from '@/lib/reactQueryProvider';
import useCheckLogin from '@/hooks/useCheckLogin';
import { redirect } from 'next/navigation';

export default async function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await useCheckLogin();
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <ReactQueryProvider>
        <Sidebar />
        <NoteMenu />
        <div className="relative ml-[655px] custom-scrollbar">{children}</div>
        <Toaster />
      </ReactQueryProvider>
    </>
  );
}
