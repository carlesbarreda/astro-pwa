import { defineConfig } from 'astro/config';

import { FLAG } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: FLAG.site,
  base: FLAG.base,
  vite: {
    base: FLAG.base,
    logLevel: 'info',
    define: {
      __SITE__: JSON.stringify(FLAG.site),
      __BASE__: JSON.stringify(FLAG.base),
    },
  }
});
