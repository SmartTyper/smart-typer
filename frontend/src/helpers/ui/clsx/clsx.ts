import clsxMethod, { ClassValue } from 'clsx';

const clsx = (...classes: ClassValue[]): string => {
  return clsxMethod(classes);
};

export { clsx };
