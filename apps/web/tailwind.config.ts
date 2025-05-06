// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@mingo/tailwind-config';

const config: Config = {
  content: [
    './app/**/*.tsx',
    './src/**/*.tsx',
    './components/**/*.tsx',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  safelist: ['text-yellow-500', 'text-gray-400', 'text-orange-700'],
  presets: [sharedConfig],
};

export default config;
