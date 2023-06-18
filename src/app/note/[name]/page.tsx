import NoteEditor from '@/components/NoteEditor/NoteEditor';
import Container from '@/components/container';
import useCheckLogin from '@/hooks/useCheckLogin';
import { Metadata } from 'next';

export interface paramsProps {
  params: { name: string };
  searchParams: {
    note_id: number;
  };
}

export async function generateMetadata({
  params,
}: paramsProps): Promise<Metadata> {
  const name = params.name;
  return {
    title: 'Nowted - ' + name,
  };
}

export default async function Page({ searchParams }: paramsProps) {
  const { session } = await useCheckLogin();

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <NoteEditor searchParams={searchParams} user={session!.user} />
      </div>
    </Container>
  );
}
