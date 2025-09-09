import { ReactNode } from 'react';

export type DrawerType = {
  side: string;
  open: boolean;
  onClose: () => void;
  ariaLabelledBy: string;
  tooltip?: string;
  children: ReactNode;
};
