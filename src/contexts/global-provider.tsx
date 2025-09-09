
import React from 'react';
import { IconProvider } from '@/contexts/icon-provider';
import { ThemeProvider } from '@/contexts/theme-provider';
import { AudioProvider } from '@/contexts/audio-provider';

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <IconProvider>
      <ThemeProvider>
        <AudioProvider>
        {children}
        </AudioProvider>
      </ThemeProvider>
    </IconProvider>
  );
}

export default GlobalProvider;
