'use client';
import CreateNewFolder from './create-new-folder';
import DialogDelete from './DeleteFolder';
import FolderLists from './FolderLists';
import UpdateFolder from './update-folder';

const FolderMenu: React.FC = () => {
  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">Folders</p>
        <CreateNewFolder />
        <UpdateFolder />
      </div>
      <div className="flex flex-col gap-[5px]">
        {/* <CreateFolder /> */}
        <FolderLists />
      </div>
      <DialogDelete />
    </div>
  );
};

export default FolderMenu;
