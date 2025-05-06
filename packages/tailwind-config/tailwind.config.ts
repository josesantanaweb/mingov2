import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        base: {
          100: '#FFF7F7',
          200: '#FDFEFF',
          300: '#55657E',
          400: '#30415A',
          500: '#253245',
          600: '#19212C',
          700: '#171d24',
          800: '#0D131C',
          900: '#0D131C',
        },
      },
    },
  },
  plugins: [],
};
export default config;
