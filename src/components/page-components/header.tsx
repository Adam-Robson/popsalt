'use client';

import type { OpenDrawerPropsType } from '@/types/header';
import { MotionButton } from '@/components/utility-components/motion-button';
import { MotionLink } from '@/components/utility-components/motion-link';
import "@/styles/header.css";

export default function Header({ setOpenDrawer }: OpenDrawerPropsType) {
  return (
    <header
      role="banner"
      className="header"
    >
      <div className="header-content">
        <nav 
          aria-label="Main" 
          className="nav"
        >
          <div 
            className="nav-buttons"
            aria-label="Site navigation"
          >
            <MotionButton 
              onClick={() => { console.log('click'); setOpenDrawer('about')} }
              title="See About" 
              className={`
                text-xs/4 sm:text-sm/5 md:text-base/6 lg:text-lg/7
              `}
            >About
            </MotionButton>

            <MotionButton 
              onClick={() => { console.log('click'); setOpenDrawer('contact')} }
              title="See Contact" 
              className={`
                text-xs/4 sm:text-sm/5 md:text-base/6 lg:text-lg/7
              `}
            >Contact
            </MotionButton>
          </div>
          <div className="nav-links">
          <MotionLink
            href="/albums"
            aria-label="Go to Albums page"
            className="nav-link"
          >See Albums
          </MotionLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
