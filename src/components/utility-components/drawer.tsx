'use client';

import { useEffect } from 'react';
import clsx from 'clsx';
import type { DrawerType } from '@/types/drawer';

export default function Drawer({ side, open, onClose, ariaLabelledBy, tooltip, children }: DrawerType) {

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; }
  }, [open]);

  const base = [
    'fixed', 'top-0', 'h-full', 'z-50', 'w-[320px]'
  ];

  const sideClass =
    side === 'left' 
      ? 'left-0 border-r ' + (open ? 'translate-x-0' : '-translate-x-full') 
      : 'right-0 border-l ' + (open ? 'translate-x-0' : 'translate-x-full');
 
  return (
    <aside
      role="dialog"
      data-tooltip={tooltip ?? undefined}
      aria-modal={open ?? undefined}
      aria-labelledby={ariaLabelledBy}
      className={clsx(base, sideClass)}
      >{children}</aside>
  )
}
