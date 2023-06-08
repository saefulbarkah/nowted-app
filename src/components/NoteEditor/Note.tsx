"use client";
import React, { useState } from "react";
import Dvider from "../ui/Dvider";
import { LuCalendarDays, LuFolder } from "react-icons/lu";
import NoteMenuList from "./NoteMenuList";
import { Editor } from "../ui/Editor";

const Note = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-[32px] text-white">
          Lorem ipsum dolor sit amet.
        </h2>
        <NoteMenuList />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-5 items-center">
          <LuCalendarDays className="text-[20px]" />
          <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
            Date
          </p>
          <p className="font-semibold text-white">21/06/2022</p>
        </div>
        <Dvider />
        <div className="flex gap-5 items-center">
          <LuFolder className="text-[20px]" />
          <p className="font-semibold text-white/[60%] w-[100px] text-[14px]">
            Folder
          </p>
          <p className="font-semibold text-white">Personal</p>
        </div>
      </div>
      <div className="min-h-screen">
        <Editor />
      </div>
    </div>
  );
};

export default Note;
