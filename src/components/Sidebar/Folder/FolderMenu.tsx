import { getFolders } from '@/lib/api';
import useCheckLogin from '@/hooks/useCheckLogin';
import ListFolder from './FolderLists';
import CreateFolder from './CreateFolder';
import SaveFolder from './SaveFolder';

interface folderProps {}

async function getFolderByuUser({ user_id }: { user_id: string }) {
  const response = await getFolders({ user_id });
  return response;
}

const FolderMenu: React.FC<folderProps> = async () => {
  const { session } = await useCheckLogin();
  const getFolder = await getFolderByuUser({ user_id: session!.user.id });
  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">Folders</p>
        <SaveFolder />
      </div>
      <div className="flex flex-col gap-[5px]">
        <CreateFolder />
        <ListFolder data={getFolder} />
      </div>
    </div>
  );
};

export default FolderMenu;
