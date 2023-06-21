import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slug(value: string) {
  if (!value) {
    return value;
  }
  const results = value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return results;
}

interface validatationObj {
  array: any[];
  inArray: { value: string | number; key: string | number };
  equalTo: { key: string | number; value: string | number };
}
export function isExistArray({ array, inArray, equalTo }: validatationObj) {
  const arr = [...array];
  const filter = arr.filter((itm) => itm[inArray.key] !== inArray.value);
  const isExists = filter.some((item) => item[equalTo.key] === equalTo.value);
  return isExists;
}
