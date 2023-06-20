import React from 'react';
import { LuLoader2 } from 'react-icons/lu';

function Loading() {
  return (
    <div className="min-h-screen items-center justify-center flex">
      <LuLoader2 className="h-[50px] w-[50px] animate-spin" />
    </div>
  );
}

export default Loading;
