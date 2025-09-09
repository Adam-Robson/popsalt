'use client';

import type { DrawerSideType, DrawerType } from '@/types/drawer';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MotionButton } from './motion-button';
import { motion } from 'motion/react';

export function MotionDrawer(props: DrawerType) {
  const {
    open,
    onClose,
    side = 'left',
    ariaLabelledBy,
    className = '',
    children,
  } = props;

  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = panelRef.current;
    if (el) el.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!mounted) return null;
  if (!open) return null;

  const root = typeof window !== 'undefined' ? document.body : null;
  if (!root) return null;

  const sidePos: Record<DrawerSideType, string> = {
    left: 'left-0 top-0 h-screen w-80 md:w-96',
    right: 'right-0 top-0 h-screen w-80 md:w-96',
    top: 'left-0 top-0 w-screen h-1/2',
    bottom: 'left-0 bottom-0 w-screen h-1/2',
  };

  const sideTransform: Record<DrawerSideType, string> = {
    left: 'data-[state=closed]:-translate-x-full',
    right: 'data-[state=closed]:translate-x-full',
    top: 'data-[state=closed]:-translate-y-full',
    bottom: 'data-[state=closed]:translate-y-full',
  };

  const panelClasses = [
    'fixed z-50',
    sidePos[side],
    'bg-[var(--background)]/95',
    'text-[var(--foreground)]',
    'shadow-2xl backdrop-saturate-150',
    'outline-none focus-visible:ring-2',
    'focus-visible:ring-[var(--accent)]',
    'transition-transform duration-300',
    'ease-out will-change-transform',
    'translate-x-0 translate-y-0',
    sideTransform[side],
    className,
  ].join(' ');

  const overlayClasses = [
    'fixed inset-0 z-40',
    'bg-black/35',
    'backdrop-blur-md',
    'supports-backdrop-blur:backdrop-blur-md',
    'data-[state=open]:opacity-100',
    'data-[state=closed]:opacity-0',
    'transition-opacity duration-200 ease-out',
  ].join(' ');

  return createPortal(
    <div aria-hidden={!open} className="contents">
      <MotionButton
        type="button"
        aria-label="Close drawer overlay"
        data-state={open ? 'open' : 'closed'}
        className={overlayClasses}
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
        data-state={open ? 'open' : 'closed'}
        className={panelClasses}
      >
        {children}
      </motion.div>
    </div>,
    root
  );
}
