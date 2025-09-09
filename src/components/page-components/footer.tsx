import React from 'react';

import { ToggleTheme } from '@/components/page-components/toggle-theme';
import "@/styles/footer.css";


export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
       <ToggleTheme />
      </div>
    </footer>
  )
}
