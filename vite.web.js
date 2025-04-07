import { defineConfig } from 'vite';
import { resolve } from 'path';
import pdfjsDevPlugin from './scripts/pdfjs-dev-plugin';

export default defineConfig({
  root: 'docs',
  server: {
    port: 5173 // Default Vite port
  },
  build: {
    outDir: './',
    rollupOptions: {
      input: resolve(__dirname, 'docs/main.js'),
      output: {
        entryFileNames: 'index.js'
      }
    }
  },
  plugins: [pdfjsDevPlugin()],
  // Make sure Vite can find node_modules files
  resolve: {
    alias: {
      'pdfjs-dist': resolve(__dirname, 'node_modules/pdfjs-dist')
    }
  }
});