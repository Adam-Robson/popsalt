import { ReactNode } from 'react';

export type IconType = {
  name: string;
  size?: number;
  weight?: number;
  label?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};
