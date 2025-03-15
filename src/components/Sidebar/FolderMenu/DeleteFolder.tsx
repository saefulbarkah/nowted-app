import Dvider from "@/components/ui/Dvider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import useFolderState from "@/hooks/useFolderState";
import { useRecentStore } from "@/store/useRecentStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

const DialogDelete = () => {
  const { isOpenDialogDelete, setDialogDelete, deleteData, removeFolder } = useFolderState();
  const [isLoading, setIsLoading] = useState(false);
  const removeRecents = useRecentStore((state) => state.removeRecents);
  const recents = useRecentStore((state) => state.recents);
  const router = useRouter();

  const handleDeleteFolder = () => {
    recents.map((item) =>
      item.folder_id === deleteData.id_folder ? removeRecents({ id_note: item.id_note }) : null
    );
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Folder has been deleted!");
      setDialogDelete(false);
      setIsLoading(false);
      removeFolder({ id_folder: deleteData.id_folder });
      router.replace("/app");
    }, 1000);
  };

  return (
    <Dialog open={isOpenDialogDelete}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-2xl font-semibold">Delete Folder?</h2>
          <Dvider />
        </DialogHeader>
        <p>
          Are you sure you want to delete
          <span className="font-bold"> {deleteData.name} </span> folder?. This will also delete all
          notes
        </p>
        <DialogFooter>
          <Button onClick={() => setDialogDelete(false)} size={"sm"} variant={"secondary"}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={() => handleDeleteFolder()}
            size={"sm"}
            variant={"destructive"}
          >
            Yes, delete it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDelete;
