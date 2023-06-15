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
}

export async function uniqueName({ data, values }: UniqueProps) {
  let counter = 1;
  let newName = '';
  const filterName = data.filter((item) => item.name.includes(values));
  const existingName = await filterName[filterName.length - 1];
  if (existingName) {
    let uniqueName = `${values}_copy`;
    while (existingName.name.includes(uniqueName)) {
      uniqueName = `${values}_copy ${counter}`;
      counter++;
    }
    newName = uniqueName;
  } else {
    newName = values;
  }
  return values;
}
