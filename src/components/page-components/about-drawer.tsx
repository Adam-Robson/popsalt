'use client';

import React, { useEffect, useRef } from 'react';
import { MotionButton } from '@/components/utility-components/motion-button';
import MotionDrawer from '@/components/utility-components/motion-drawer';
import type { AboutType } from '@/types/about-drawer';

export function AboutDrawer({ open, onClose }: AboutType) {
  const aboutFocusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) aboutFocusRef.current?.focus();
  }, [open]);

  return (
    <MotionDrawer
      side="left"
      open={open}
      onClose={onClose}
      ariaLabelledBy="about-title"
      className="p-8"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 id="about-title" className="text-2xl">
            About
          </h2>
          <MotionButton onClick={onClose} aria-label="Close About">
            Close
          </MotionButton>
        </div>

        <div
          ref={aboutFocusRef}
          tabIndex={-1}
          className="outline-none overflow-y-auto"
        >
          <div className="prose prose-invert max-w-prose">
            <p className="mt-4">
              I build software with a focus on clean UX, robust
              data flows, and contemporary best practices. This
              site explores music projects and ways to connect.
            </p>
            <p className="mt-4">
              Tech stack: Next.js, TypeScript, Tailwind,
              Howler.js, plus Python for data pipelines.
            </p>
          </div>
        </div>
      </div>
    </MotionDrawer>
  );
}
