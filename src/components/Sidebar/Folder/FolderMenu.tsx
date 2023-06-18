import { getFolders } from '@/lib/api';
import useCheckLogin from '@/hooks/useCheckLogin';
import ListFolder from './FolderLists';
import CreateFolder from './CreateFolder';
import SaveFolder from './SaveFolder';

const FolderMenu: React.FC = async () => {
  const { session } = await useCheckLogin();
  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">Folders</p>
        <SaveFolder />
      </div>
      <div className="flex flex-col gap-[5px]">
        <CreateFolder />
        <ListFolder user={session!.user} />
      </div>
    </div>
  );
};

export default FolderMenu;
