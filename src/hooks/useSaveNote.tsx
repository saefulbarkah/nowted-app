import { useNowtedStore } from "@/store";
import { useRecentStore } from "@/store/useRecentStore";
import { NoteTypes } from "@/types";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function useSaveNote({ content = "", folder_id, id_note, name }: Partial<NoteTypes>) {
  const [onSave, setOnSave] = useState<boolean>(false);
  const [isError, setError] = useState<{
    error: {
      [key: string]: string | boolean;
    };
  } | null>(null);
  const saveNote = useNowtedStore((state) => state.saveNote);
  const updateTitleRecent = useRecentStore((state) => state.updateTitleRecent);

  const onSaving = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveNote({
          folder_id: folder_id as string,
          id_note: id_note as string,
          name: name as string,
        });
        updateTitleRecent({ id_note: id_note, name: name });
        toast.success("Note has been saved!");
        resolve("OK");
      }, 1000);
    });
  };
  const handleSaveTitle = async () => {
    setOnSave(true);
    if (!name) {
      toast.error("Title Note is Required");
      setError({
        error: {
          message: `Title Note is Required`,
          name: true,
        },
      });
      setOnSave(false);
      return;
    }
    await onSaving();
    setOnSave(false);
  };

  useEffect(() => {
    setError(null);
  }, [name]);

  return { handleSaveTitle, onSave, isError };
}

export default useSaveNote;
