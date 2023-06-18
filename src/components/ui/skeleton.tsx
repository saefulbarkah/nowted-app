import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md duration-1000 ease-in-out bg-white/[3%]',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
