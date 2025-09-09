import { ReactNode } from 'react';

export type DrawerSideType = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerType {
  open: boolean;
  onClose: () => void;
  side?: DrawerSideType;
  ariaLabelledBy?: string;
  className?: string;
  children: ReactNode;
}
