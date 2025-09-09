'use client';
import { type AboutDrawerType } from '@/types/about-drawer';
import React, { useEffect, useRef } from 'react';
import { MotionDrawer } from '@/components/utility-components/motion-drawer';

export function AboutDrawer(props: AboutDrawerType) {
  const { open, onClose } = props;
  const titleId = 'about-title';
  const focusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    if (focusRef.current) focusRef.current.focus();
  }, [open]);

  return (
    <MotionDrawer
      side="left"
      open={open}
      onClose={onClose}
      ariaLabelledBy={titleId}
      className="p-8 flex flex-col gap-4"
    >
      <header className="flex items-center justify-between">
        <h2 id={titleId} className="text-2xl font-semibold">
          About
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 rounded-md border
                     border-[var(--border)]/30 hover:border-
                     [var(--border)]/60 transition"
          aria-label="Close about drawer"
        >
          Close
        </button>
      </header>

      <div
        ref={focusRef}
        tabIndex={-1}
        className="outline-none overflow-y-auto pr-2"
      >
        <div className="prose prose-invert max-w-prose">
          <p className="mt-2">
            I build software with a focus on clean UX, robust
            data flows, and contemporary best practices. This
            site explores music projects and ways to connect.
          </p>
          <p className="mt-4">
            Tech stack: Next.js, TypeScript, Tailwind, Howler,
            and Python for data pipelines.
          </p>
        </div>
      </div>
    </MotionDrawer>
  );
}
