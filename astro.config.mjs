// Node built-ins
import { promises as fs } from 'fs';
import { URL } from 'node:url';

// External libraries/frameworks
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import glob from 'fast-glob';

// Local modules
import { ASSETS_URL, getCurrentAssetsUrl, getCurrentBaseUrl, getCurrentSiteUrl } from './src/lib/constants.ts';
import htmlBeautifier from './src/lib/htmlFormatter.js';

// Resolve environment-aware values
const siteUrl = getCurrentSiteUrl();
const baseUrl = getCurrentBaseUrl();
const assetsUrl = getCurrentAssetsUrl();
const outDirUrl = `./dist${getCurrentBaseUrl()}`; // Removes trailing slash

// Respect ASSETS_URL overrides when enabled
const assetsDir = ASSETS_URL.STATUS ? new URL(assetsUrl).pathname.replace(/^\//, '') : '_astro';

export default defineConfig({
  site: process.env.PUBLIC_BASE_URL ? 'https://galitianu.github.io' : siteUrl,
  base: process.env.PUBLIC_BASE_URL ? process.env.PUBLIC_BASE_URL : baseUrl,
  outDir: process.env.PUBLIC_BASE_URL ? './dist' : outDirUrl,
  compressHTML: false, // Keep HTML readable for post-build formatting
  build: {
    // Never inline stylesheets
    inlineStylesheets: 'never',
    // Explicit asset directory
    assets: assetsDir,
    // Prefix for CDN/asset host overrides
    assetsPrefix: ASSETS_URL.STATUS ? assetsUrl : undefined,
    // Emit formatted HTML files
    format: 'file',
  },
  integrations: [
    react(),
    // Post-build HTML formatting
    htmlBeautifier({
      parser: 'html',
      tabWidth: 2,
      useTabs: true,
      printWidth: 120,
      htmlWhitespaceSensitivity: 'css',
    }),
    {
      // Custom cleanup integration
      name: 'clean-dist-folder',
      hooks: {
        // Run after the Astro build finishes
        'astro:build:done': async ({ dir }) => {
          try {
            // Remove platform junk files
            // .DS_Store: macOS metadata
            // Thumbs.db: Windows thumbnail cache
            // Desktop.ini: Windows folder config
            const junkFiles = await glob(`${dir.pathname}/**/{.DS_Store,Thumbs.db,Desktop.ini}`);
            console.log(`Found ${junkFiles.length} junk files to delete`);

            for (const file of junkFiles) {
              await fs.unlink(file);
            }

            // Remove macOS-specific artifacts
            const macosxDirs = await glob(`${dir.pathname}/**/__MACOSX`);
            console.log(`Found ${macosxDirs.length} __MACOSX directories to delete`);

            for (const dirPath of macosxDirs) {
              const stats = await fs.stat(dirPath);
              if (stats.isDirectory()) {
                // recursive: delete nested entries
                // force: handle read-only files
                await fs.rm(dirPath, { recursive: true, force: true });
              }
            }

            console.log('Clean-up completed successfully');
          } catch (error) {
            console.error('--- Clean-up Dist Folder Error ---');
            console.error(`Error Message: ${error.message}`);
            console.error(`Stack Trace: ${error.stack}`);
            console.error('-----------------------------------');
          }
        },
      },
    },
  ],
  devToolbar: {
    enabled: false, // Disable the built-in toolbar
  },
  server: e => ({
    port: e.command === 'dev' ? 4000 : 4321,
    host: true, // Allow LAN access
    open: true, // Auto-open the browser on start
  }),
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: process.env.NODE_ENV === 'production', // Only minify in production
      assetsInlineLimit: 0, // Prevent automatic inlining below 4 KB
      rollupOptions: {
        output: {
          entryFileNames: entryInfo => {
            return `assets/js/[name].js`; // Add .[hash] if needed
          },
          assetFileNames: assetInfo => {
            if (ASSETS_URL.STATUS) {
              const info = assetInfo.name.split('.');
              const extType = info[info.length - 1];
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                return `assets/images/[name][extname]`;
              } else if (/css/i.test(extType)) {
                return `assets/css/[name]-[hash][extname]`;
              } else if (/js/i.test(extType)) {
                return `assets/js/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            } else {
              return `_astro/[name].[hash][extname]`;
            }
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Suppress the legacy Sass API warning
          api: 'modern-compiler',
          // additionalData: `@use '@/assets/stylesheets/app.scss' as app;`
        },
      },
    },
    // Strip console/debugger only in production builds
    esbuild: process.env.NODE_ENV === 'production' ? { drop: ['console', 'debugger'] } : {},
  },
});
