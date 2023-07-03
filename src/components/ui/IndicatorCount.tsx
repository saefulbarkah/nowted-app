import clsx from 'clsx';
import React, { FC, PropsWithChildren } from 'react';

interface IndicatorCountProps extends PropsWithChildren {
  className?: string;
}

const IndicatorCount: FC<IndicatorCountProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'bg-primary rounded-full text-white w-[24px] h-[24px] text-center text-sm flex items-center justify-center',
        className
      )}
    >
      {children}
    </div>
  );
};

export default IndicatorCount;
