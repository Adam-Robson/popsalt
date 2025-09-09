'use client';

import React from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';
import clsx from 'clsx';

export type MotionDrawerSide =
  | 'left' | 'right' | 'top' | 'bottom';

export type MotionDrawerProps = {
  side: MotionDrawerSide;
  open: boolean;
  onClose: () => void;
  ariaLabelledBy: string;
  className?: string;
  children: React.ReactNode;
};

/* variants kept at module scope */
const BACKDROP_VARS = {
  hidden: { opacity: 0 },
  show:   { opacity: 0.6 },
} as const;

const PANEL_VARS = {
  left:   { hidden: { x: -24, opacity: 0 },
            show:   { x: 0,   opacity: 1 } },
  right:  { hidden: { x: 24,  opacity: 0 },
            show:   { x: 0,   opacity: 1 } },
  top:    { hidden: { y: -24, opacity: 0 },
            show:   { y: 0,   opacity: 1 } },
  bottom: { hidden: { y: 24,  opacity: 0 },
            show:   { y: 0,   opacity: 1 } },
} as const;

const PANEL_TRANS = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
} as const;

const BACKDROP_TRANS = { duration: 0.18 } as const;

/* stopPropagation helper (module scope) */
function stop(
  e: React.MouseEvent<HTMLElement, MouseEvent>
): void {
  e.stopPropagation();
}

export default function MotionDrawer({
  side,
  open,
  onClose,
  ariaLabelledBy,
  className,
  children,
}: MotionDrawerProps) {
  const reduce = useReducedMotion();
  const pv = PANEL_VARS[side];

  return (
    <AnimatePresence initial={false} mode="wait">
      {open && (
        <motion.div
          key="md-backdrop"
          className="fixed inset-0 z-50
                     bg-black/80"
          role="presentation"
          onClick={onClose}
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={BACKDROP_VARS}
          transition={reduce ? undefined : BACKDROP_TRANS}
        >
          <div
            className={clsx(
              'absolute inset-0 flex',
              side === 'left'  && 'justify-start',
              side === 'right' && 'justify-end',
              side === 'top'   && 'items-start',
              side === 'bottom'&& 'items-end'
            )}
          >
            <motion.aside
              key="md-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={ariaLabelledBy}
              tabIndex={-1}
              onClick={stop}
              className={clsx(
                'w-[min(88vw,520px)] h-dvh',
                'bg-[var(--background)]/85',
                'backdrop-blur-xl shadow-2xl',
                'outline-0',
                side === 'top'    && 'w-dvw h-[min(88vh,520px)]',
                side === 'bottom' && 'w-dvw h-[min(88vh,520px)]',
                className
              )}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={pv}
              transition={reduce ? undefined : PANEL_TRANS}
              style={{ willChange: 'transform, opacity' }}
            >
              {children}
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
