import useFolderState from '@/hooks/useFolderState';
import useValidation from '@/hooks/useValidation';
import React from 'react';
import { LuFolder } from 'react-icons/lu';

function UpdateFolder() {
  const { isEditFolder, updateData, setUpdateData, setName } = useFolderState();
  const { isError, response } = useValidation({
    field: 'Folder',
    value: updateData.name,
  });
  return (
    <>
      {isEditFolder && (
        <div className="flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px]">
          <div>
            <LuFolder className="text-[20px]" />
          </div>
          <div className="relative">
            <input
              name="folderName"
              type="text"
              autoFocus
              defaultValue={updateData.name}
              onChange={(e) => {
                setUpdateData({
                  name: e.target.value,
                  id_folder: updateData.id_folder,
                });
                setName(e.target.value);
              }}
              className={`bg-transparent outline outline-white/[5%] rounded w-auto ${
                isError && 'border border-red-500'
              }`}
            />
            <div
              className={`absolute transition-opacity ${
                isError
                  ? 'inset-0 -translate-y-6 text-[14px] text-red-500 opacity-100'
                  : 'opacity-0'
              }`}
            >
              {isError && <p>{response.message}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateFolder;
