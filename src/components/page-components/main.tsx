'use client';

import React from 'react';
import WordCarousel from '@/components/page-components/word-carousel';
import { ContactDrawer } from '@/components/contact/contact-drawer';
import { AboutDrawer } from '@/components/about/about-drawer';
import { attribute, characteristic } from '@/constants/word';
import type { MainType } from '@/types/main';

export function Main({ open, onClose }: MainType) {

  return (
    <main className="
        min-h-screen
        grid grid-rows-[auto,1fr,auto]
        overflow-hidden
      ">
      <section className="
          absolute inset-0 grid
          place-items-center
          text-center p-6 
          pointer-events-none
        ">
        <div className="space-y-4 pointer-events-auto">
          <p className="
              text-[5rem] sm:text-[8rem] 
              md:text-[10rem] lg:text-[12rem]
              tracking-tight subpixel-antialiased
            ">
            <span className="leading-20">
              <WordCarousel 
                className="text-4xl tracking-tight"
                words={attribute}
                hold={9000}
                fade={2100}
              />
            </span>
          </p>
          <p className="text-4xl tracking-tight leading-20">for</p>
          <span className="leading-20">
            <WordCarousel
              className="text-xl tracking-tight"
              words={characteristic}
              hold={12000}
              fade={3000}
            />
          </span>
        </div>
      </section>

      <AboutDrawer open={!!open} onClose={onClose} />
      <ContactDrawer open={!!open} onClose={onClose} />
    </main>
  );
}
