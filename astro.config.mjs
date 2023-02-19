import { defineConfig } from 'astro/config';

import AstroPWA from "@vite-pwa/astro";

const FLAG = {
  mode: import.meta.env.PROD ? "production" : "development",
  site: import.meta.env.SITE ?? "https://carlesbarreda.github.io",
  base: import.meta.env.BASE_URL ?? "/astro-pwa",
};

// Parse Argo CLI flags
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === "--site") FLAG.site = process.argv[++i];
  if (process.argv[i] === "--base") FLAG.base = process.argv[++i];
}

// Add trailing slash if nedded
FLAG.base += !FLAG.base?.endsWith("/") ? "/" : "";

console.log("* FLAG");
console.log(FLAG);
console.log("* import,meta.env");
console.log(import.meta.env);

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
  },
  integrations: [
    AstroPWA({
      disable: false,
      mode: FLAG.mode,
      base: FLAG.base,
      scope: FLAG.base,
      outDir: "dist",
      registerType: "prompt",
      strategies: "generateSW",
      includeAssets: ["favicon.svg"],
      buildBase: FLAG.base,
      manifest: {
        id: `${FLAG.base}?astro-pwa`,
        start_url: `${FLAG.base}?standalone=true`,
        name: "astro-pwa",
        short_name: "astro-pwa",
        description: "@vite-pwa/astro: PWA integration for Astro.",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "standalone",
        orientation: "natural",
        dir: "ltr",
        icons: [
          {
            src: `${FLAG.base}pwa/manifest-icon-192.maskable.png`,
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: `${FLAG.base}pwa/manifest-icon-192.maskable.png`,
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: `${FLAG.base}pwa/manifest-icon-512.maskable.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: `${FLAG.base}pwa/manifest-icon-512.maskable.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globDirectory: "dist",
        globPatterns: [
          "**/*.{js,html,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico,txt}",
        ],
      },
      devOptions: {
        enabled: import.meta.env.DEV,
      },
    }),
  ],
});
