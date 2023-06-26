'use client';
import DialogDelete from './DeleteFolder';
import CreateFolder from './CreateFolder';
import SaveFolder from './SaveFolder';
import FolderLists from './FolderLists';

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
      <DialogDelete />
    </div>
  );
};

export default FolderMenu;
