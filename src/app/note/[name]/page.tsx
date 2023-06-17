import NoteMenuList from '@/components/NoteEditor/NoteMenuList';
import Container from '@/components/container';
import Dvider from '@/components/ui/Dvider';
import { Editor } from '@/components/ui/Editor';
import { Metadata } from 'next';
import { LuCalendarDays, LuFolder } from 'react-icons/lu';

export interface paramsProps {
  params: { name: string };
  searchParams?: {
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

export async function getNoteById(id: string) {}

export default async function page({ params, searchParams }: paramsProps) {
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[32px] text-white">
            Lorem ipsum dolor sit amet.
          </h2>
          <NoteMenuList />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-5 items-center">
            <LuCalendarDays className="text-[20px]" />
            <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
              Date
            </p>
            <p className="font-semibold text-white">21/06/2022</p>
          </div>
          <Dvider />
          <div className="flex gap-5 items-center">
            <LuFolder className="text-[20px]" />
            <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
              Folder
            </p>
            <p className="font-semibold text-white">Personal</p>
          </div>
        </div>
        <div className="min-h-screen">
          <Editor />
        </div>
      </div>
    </Container>
  );
}
