'use client';

import { useTheme } from '@/contexts/theme-provider';
import Icon from '@/components/utility-components/icon'
import { MotionButton } from '@/components/utility-components/motion-button';

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <MotionButton
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
       <Icon 
        name={isDark ? 'sun' : 'moon'} 
        label={`Toggle ${isDark ? 'light' : 'dark' } theme`} 
        className={isDark ? 'text-neutral-200' : 'text-neutral-800'} 
      />
    </MotionButton>
  );
}
