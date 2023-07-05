import clsx from 'clsx';
import React, { FC } from 'react';

interface IndicatorCountProps {
  className?: string;
  count: number;
}

const IndicatorCount: FC<IndicatorCountProps> = ({ className, count }) => {
  if (!count || count === 0) return null;
  return (
    <div
      className={clsx(
        'bg-primary rounded-full text-white w-[25px] h-[25px] font-medium text-center text-[12px] flex items-center justify-center',
        className
      )}
    >
      {count >= 100 ? '99+' : count}
    </div>
  );
};

export default IndicatorCount;
