'use client';

import { useEffect, useRef } from 'react';
import { MotionDrawer } from '@/components/utility-components/motion-drawer';
import { MotionButton } from '@/components/utility-components/motion-button';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useContactForm } from '@/hooks/use-contact-form';
import type { ContactDrawerType } from '@/types/contact-drawer';
import Icon from '../utility-components/icon';

export function ContactDrawer({ open, onClose }: ContactDrawerType) {
  const titleId = 'contact-title';
  const focusRef = useRef<HTMLDivElement | null>(null);
  
  const { bind, status, error, firstError, handleSubmit } =
    useContactForm();

  const isSubmitting = status === 'submitting';
  const hasError = status === 'error';
  const isSuccess = status === 'success';

  useEffect(() => {
    if (!open) return;
    if (focusRef.current) focusRef.current.focus();
  }, [open]);

  return (
    <MotionDrawer
      side="right"
      open={open}
      onClose={onClose}
      ariaLabelledBy={titleId}
      className="p-8"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 id="contact-title" className="text-2xl">
            Contact
          </h2>
          <MotionButton onClick={onClose} aria-label="Close Contact">
            <Icon name="x" />
          </MotionButton>
        </div>

        <div
          ref={focusRef}
          tabIndex={-1}
          className="outline-none overflow-y-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="grid gap-3 w-full max-w-lg"
            aria-describedby={
              hasError
                ? 'contact-error'
                : isSuccess
                ? 'contact-success'
                : undefined
            }
            noValidate
          >
            <input
              type="text"
              {...bind('website')}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <input
              type="text"
              placeholder="Your name"
              aria-label="Your name"
              {...bind('name')}
              className="w-full rounded-md px-3 py-2
                         bg-[var(--background)] text-[var(--text)]
                         border border-[var(--neutral-50)]
                         placeholder-[color:var(--neutral-50)]
                         focus:outline-none focus:ring-2
                         focus:ring-[var(--accent)]"
            />
            {firstError('name') && (
              <p className="text-red-300 text-xs">
                {firstError('name')}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              {...bind('email')}
              className="w-full rounded-md px-3 py-2
                         bg-[var(--background)] text-[var(--text)]
                         border border-[var(--neutral-50)]
                         placeholder-[color:var(--neutral-50)]
                         focus:outline-none focus:ring-2
                         focus:ring-[var(--accent)]"
            />
            {firstError('email') && (
              <p className="text-red-300 text-xs">
                {firstError('email')}
              </p>
            )}

            <textarea
              placeholder="Message"
              aria-label="Message"
              {...bind('message')}
              className="w-full min-h-32 rounded-md px-3 py-2
                         bg-[var(--background)] text-[var(--text)]
                         border border-[var(--neutral-50)]
                         placeholder-[color:var(--neutral-50)]
                         focus:outline-none focus:ring-2
                         focus:ring-[var(--accent)]"
            />
            {firstError('message') && (
              <p className="text-red-300 text-xs">
                {firstError('message')}
              </p>
            )}

            <MotionButton
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2
                         justify-center"
            >
              {isSubmitting ? 'Sending…' : 'Send'}
              <PaperPlaneRightIcon
                size={18}
                weight="regular"
                aria-hidden
              />
            </MotionButton>

            {hasError && (
              <p id="contact-error" className="text-red-300 text-sm">
                {error ?? 'Failed to send'}
              </p>
            )}
            {isSuccess && (
              <p id="contact-success"
                 className="text-[var(--secondary)] text-sm">
                Thanks! I&apos;ll be in touch.
              </p>
            )}
          </form>
        </div>
      </div>
    </MotionDrawer>
  );
}
