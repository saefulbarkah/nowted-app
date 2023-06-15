import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slug(value: string) {
  const slug = value.split(' ').join('-');
  return slug;
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
