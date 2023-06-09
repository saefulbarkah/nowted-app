import React, { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return <div className="px-[30px]">{children}</div>;
}

export default Container;
