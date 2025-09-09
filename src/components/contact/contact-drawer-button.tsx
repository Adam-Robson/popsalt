'use client';
import React, { useState } from 'react';
import { MotionButton } from '@/components/utility-components/motion-button';

export function ContactDrawerButton() {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);

  return (
    <div className="min-h-dvh flex justify-center items-center gap-4">
      <MotionButton
        type="button"
        onClick={openDrawer}
        className="text-xs/4 sm:text-sm/5 md:text-base/6 lg:text-lg/7"
      >
        Contact
      </MotionButton>
    </div>
  );
}
