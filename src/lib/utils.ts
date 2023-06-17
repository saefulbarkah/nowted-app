import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slug(value: string) {
  if (!value) return;
  const slug = value.split(' ').join('-');
  return slug;
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

export function htmlToPlainText({ html }: { html: string | null | undefined }) {
  if (!html) return;
  return html.replace(/<[^>]+>/g, '');
}

interface UniqueProps {
  data: any[];
  values: string;
  id?: string;
}

export async function uniqueName({ data, values }: UniqueProps) {
  const filterName = data.filter((item) => item.name.includes(values));
  const existingName = await filterName[filterName.length - 1];
}
