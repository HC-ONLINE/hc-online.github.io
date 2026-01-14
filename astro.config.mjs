// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://HC-ONLINE.github.io', 
  base: '/HC-Architecture',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});