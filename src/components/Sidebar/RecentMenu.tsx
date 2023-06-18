'use client';
import { slug } from '@/lib/utils';
import { useRecentStore } from '@/store/useRecentStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { FiFileText } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';

const NonSSRWrapper = ({ children }: PropsWithChildren) => <>{children}</>;
const ComponentWithNoSSR = dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-[7px]">
      <Skeleton className="w-full h-[32px] rounded-none" />
      <Skeleton className="w-full h-[32px] rounded-none" />
      <Skeleton className="w-full h-[32px] rounded-none" />
    </div>
  ),
});

const RecentMenu: React.FC = () => {
  const recents = useRecentStore((state) => state.recents);
  const searchParams = useSearchParams();
  const get_note_id = searchParams.get('note_id');
  return (
    <div className="flex flex-col space-y-[8px]">
      <p className="text-[14px] font-semibold inactive-text px-[30px]">
        Recents
      </p>
      <div className="flex flex-col gap-[5px]">
        <ComponentWithNoSSR>
          {recents?.map((item, i) => (
            <React.Fragment key={i}>
              <Link
                className={`flex items-center py-[10px] space-x-[15px] inactive-text hover:text-white hover:bg-white/[3%] transition-colors px-[30px] ${
                  Number(get_note_id) === Number(item.id) &&
                  'bg-primary text-white hover:bg-primary/70'
                }`}
                href={`/note/${slug(item.name)}?folder=${slug(
                  item.folder.name
                )}&folder_id=${item.folder_id}&note_id=${item.id}`}
              >
                <div>
                  <FiFileText className="text-[20px]" />
                </div>
                <p className="truncate text-[16px]">{item.name}</p>
              </Link>
            </React.Fragment>
          ))}
        </ComponentWithNoSSR>
      </div>
    </div>
  );
};
export default RecentMenu;
