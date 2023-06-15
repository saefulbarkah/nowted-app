import useFolderState from '@/hooks/useFolderState';
import useValidation from '@/hooks/useValidateName';
import React from 'react';
import { LuFolderOpen } from 'react-icons/lu';

function CreateFolder() {
  const { createFolder, setName, name, folders } = useFolderState();
  const { isError } = useValidation({
    data: name,
  });
  return (
    <>
      {createFolder && (
        <div className="flex items-center gap-[15px] px-[30px] py-[10px]">
          <div>
            <LuFolderOpen className="text-[20px]" />
          </div>
          <div className="relative">
            <input
              type="text"
              defaultValue={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
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
              {isError && <p>*Folder Name is required</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateFolder;
