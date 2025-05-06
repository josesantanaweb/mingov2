import type { Config } from 'tailwindcss';
import sharedConfig from '@mingo/tailwind-config';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  prefix: '',
  presets: [sharedConfig],
};

export default config;
