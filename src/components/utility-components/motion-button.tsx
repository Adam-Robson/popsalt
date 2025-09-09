'use client';

import { motion } from 'motion/react';

export function MotionButton({
  children,
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={`relative inline-flex items-center ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute left-0 bottom-0 h-[2px] w-0 bg-current"
        initial={false}
        whileHover={{ width: '100%' }}
        whileFocus={{ width: '100%' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </button>
  );
}
