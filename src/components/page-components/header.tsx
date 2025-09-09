'use client';

import type { OpenDrawerPropsType } from '@/types/header';
import { MotionButton } from '@/components/utility-components/motion-button';
import { MotionLink } from '@/components/utility-components/motion-link';
import "@/styles/header.css";
import { AboutDrawerButton } from '../about/about-drawer-button';
import { ContactDrawerButton } from '../contact/contact-drawer-button';

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
           <AboutDrawerButton />
           <ContactDrawerButton />
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
