import { ClassProp } from "class-variance-authority/dist/types";
import React from "react";

function Dvider({ className }: { className?: string }) {
  return <div className={`bg-white/[20%] w-full h-[1px] ${className}`}></div>;
}

export default Dvider;
