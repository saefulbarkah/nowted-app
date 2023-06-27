import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { convert } from 'html-to-text';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface toPlainText {
  type: 'html';
  value: string;
}

export function toPlainText({ type = 'html', value }: toPlainText) {
  switch (type) {
    case 'html':
      const text = convert(value, { wordwrap: 130 });
      return text;
    default:
      break;
  }
}

interface dateToString {
  type?: 'yyy-mm-dd' | null;
  values: any;
}

export function dateToString({ type, values }: dateToString) {
  let results;
  const date = new Date(values);
  switch (type) {
    case 'yyy-mm-dd':
      const converting = date.toLocaleDateString('zh-Hans-CN');
      results = converting;
      break;

    default:
      const defaultConverting = date.toLocaleDateString('default');
      results = defaultConverting;
      break;
  }

  return results;
}

export function slug(value?: string) {
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
