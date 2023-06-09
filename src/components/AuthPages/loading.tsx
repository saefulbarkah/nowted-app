import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className="flex items-center gap-2">
      <AiOutlineLoading3Quarters className="text-[16px] animate-spin" />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
