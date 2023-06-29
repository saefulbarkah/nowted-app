import React, { PropsWithChildren } from "react";

type containerType = PropsWithChildren & {
  className?: string;
};
function Container({ children, className }: containerType) {
  return <div className={`px-[30px] py-[30px] ${className}`}>{children}</div>;
}

export default Container;
