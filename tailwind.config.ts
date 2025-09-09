import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // adjust for project
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--background)',
        bg5: 'var(--background-50)',
        ne: 'var(--neutral)',
        ne5: 'var(--neutral-50)',
        fg: 'var(--text)',
        fg5: 'var(--text-50)',
        pr: 'var(--primary)',
        pr5: 'var(--primary-50)',
        se: 'var(--secondary)',
        se5: 'var(--secondary-50)',
        ac: 'var(--accent)',
        ac5: 'var(--accent-50)',
        ca: 'var(--canvas)',
      },
    },
  },
  plugins: [],
};

export default config;
