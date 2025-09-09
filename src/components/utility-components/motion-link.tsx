'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export function MotionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        layoutId="underline"
        className="absolute left-0 bottom-0 h-[2px] w-0
                   bg-current"
        initial={false}
        whileHover={{ width: '100%' }}
        whileFocus={{ width: '100%' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </Link>
  );
}
