'use client';
import { cn } from '@/lib/utils';
import {
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiEdit2 } from 'react-icons/fi';
interface EditableProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  maxLength: number;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const Editable: FC<EditableProps> = ({
  className,
  value,
  maxLength,
  isEdit,
  setIsEdit,
  ...props
}) => {
  const [currValue, setCurrentValue] = useState<number>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      setCurrentValue(inputRef.current.value.length);
    }
  }, [isEdit, value]);

  return (
    <>
      {isEdit ? (
        <div className="w-full ">
          <input
            className={cn('bg-transparent outline-none  ', className)}
            maxLength={Number(maxLength)}
            autoFocus={true}
            value={value}
            ref={inputRef}
            {...props}
          />
          <span
            className={`text-sm text-white/50 ${
              currValue === Number(maxLength) && '!text-red-500'
            }`}
          >
            {currValue}/{maxLength}
          </span>
        </div>
      ) : (
        <div
          className="flex gap-2 w-full break-words cursor-pointer"
          onClick={() => setIsEdit(true)}
        >
          <FiEdit2 className="w-[30px] text-[20px] translate-y-2" />
          <p
            className={cn(
              'bg-transparent outline-none cursor-pointer break-all',
              className
            )}
          >
            {value}
          </p>
        </div>
      )}
    </>
  );
};

export default Editable;
