import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useFolderState from "@/hooks/useFolderState";
import useValidation from "@/hooks/useValidateName";
import { useFolder } from "@/store";
import React from "react";
import { FiFolderPlus, FiSave, FiX } from "react-icons/fi";

function CreateOrUpdateFolder() {
  // Hooks
  const {
    createFolder,
    editFolder,
    setCreateFolder,
    setEditFolder,
    name,
    setName,
  } = useFolderState();
  const { isError } = useValidation({
    data: name,
  });
  const { toast } = useToast();
  const addFolder = useFolder((state) => state.addFolder);

  const handleCloseFolderButton = () => {
    setName("My New Folder");
    if (createFolder) {
      return setCreateFolder(false);
    }
    if (editFolder) {
      return setEditFolder(false);
    }
  };

  const handleAddOrUpdateFolder = () => {
    if (isError) {
      toast({
        title: "Error",
        description: "Folder name is required",
        variant: "danger",
      });
      return;
    }
    if (editFolder) {
      setEditFolder(false);
      setName("My New Folder");
      // updateFolder({
      //   id: dataUpdate.id,
      //   name: name,
      // });
      return;
    }

    setCreateFolder(false);
    addFolder({ name: name });
  };
  return (
    <>
      {createFolder || editFolder ? (
        <div className="flex">
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => handleAddOrUpdateFolder()}
            className="px-2 py-2"
          >
            <FiSave className="text-[20px]" />
          </Button>
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => handleCloseFolderButton()}
            className="px-2 py-2"
          >
            <FiX className="text-[20px]" />
          </Button>
        </div>
      ) : (
        <>
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => {
              setCreateFolder(true);
              console.log("create folder");
            }}
          >
            <FiFolderPlus className="text-[20px]" />
          </Button>
        </>
      )}
    </>
  );
}

export default CreateOrUpdateFolder;
