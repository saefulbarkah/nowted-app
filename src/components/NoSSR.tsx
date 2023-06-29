'use client';
import { PropsWithChildren, useEffect, useState } from 'react';

const NoSSR = ({ children }: PropsWithChildren) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default NoSSR;
