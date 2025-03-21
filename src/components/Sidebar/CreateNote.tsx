"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import useFolderState from "@/hooks/useFolderState";
import { useNowtedStore } from "@/store";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { useSidebar } from "../Mobile/Sidebar";

function CreateNote() {
  const [isLoading, setLoading] = useState(false);
  const params = useParams();
  const { folderId } = params;
  const { folders } = useFolderState();
  const addNote = useNowtedStore((state) => state.addNote);
  const setSidebar = useSidebar((state) => state.setOpen);

  const addingNewNotes = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        addNote({ id_folder: folderId as string | null });
        resolve(1);
      }, 1000);
    });
  };

  const handleCreateNote = async () => {
    setLoading(true);
    await addingNewNotes();
    setLoading(false);
    toast.success("Note has been created!");
    setSidebar(false);
    return;
  };

  return (
    <div className="px-[20px]">
      <Button
        className="w-full text-[16px] font-semibold"
        size={"lg"}
        isLoading={isLoading}
        disabled={params.folderId ? false : true}
        variant={"secondary"}
        onClick={() => handleCreateNote()}
      >
        {isLoading ? null : <FiPlus className="text-[20px] mr-2" />}
        <span>New Note</span>
      </Button>
    </div>
  );
}

export default CreateNote;
