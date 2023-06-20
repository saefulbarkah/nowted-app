'use client';
import DialogDelete from './DeleteFolder';
import CreateFolder from './CreateFolder';
import SaveFolder from './SaveFolder';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Disable SSR
const FolderLists = dynamic(() => import('./FolderLists'), {
  ssr: false,
  loading: () => (
    <>
      <div className="flex flex-col gap-[15px]">
        {Array(3)
          .fill(null)
          .map((item, i) => (
            <div
              className="flex items-center px-[30px] justify-between"
              key={i}
            >
              <div className="flex gap-2">
                <Skeleton className="h-[30px] rounded-sm w-[20px]" />
                <Skeleton className="h-[30px] rounded-sm w-[150px]" />
              </div>
              <Skeleton className="h-[30px] rounded-sm w-[20px] mr-4" />
            </div>
          ))}
      </div>
    </>
  ),
});

const FolderMenu: React.FC = () => {
  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">Folders</p>
        <SaveFolder />
      </div>
      <div className="flex flex-col gap-[5px]">
        <CreateFolder />
        <FolderLists />
      </div>

      {/* dialog delete folder */}
      <DialogDelete />
    </div>
  );
};

export default FolderMenu;
