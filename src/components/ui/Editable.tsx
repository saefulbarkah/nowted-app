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
import LoadingIcons from 'react-loading-icons';
interface EditableProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  maxLength: number;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  defaultValue: string;
}

const Editable: FC<EditableProps> = ({
  className,
  value,
  maxLength,
  isEdit,
  setIsEdit,
  defaultValue,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      {isEdit ? (
        <div className="w-full ">
          <input
            className={cn('bg-transparent outline-none  ', className)}
            maxLength={Number(maxLength)}
            autoFocus={true}
            defaultValue={defaultValue}
            ref={inputRef}
            {...props}
          />
          <span
            className={`text-sm text-white/50 ${
              inputRef?.current?.value.length === Number(maxLength) &&
              '!text-red-500'
            }`}
          >
            {inputRef?.current?.value.length}/{maxLength}
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
            {defaultValue}
          </p>
        </div>
      )}
    </>
  );
};

export default Editable;
