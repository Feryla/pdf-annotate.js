import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import pdfjsDevPlugin from './scripts/pdfjs-dev-plugin';

const SANDBOX_DIR = resolve(__dirname, 'sandbox');

// Build entries dynamically
function buildEntries() {
  return fs.readdirSync(SANDBOX_DIR).reduce((entries, dir) => {
    if (dir === 'build' || dir === 'shared' || dir.charAt(0) === '_') {
      return entries;
    }

    const isDirectory = fs.lstatSync(resolve(SANDBOX_DIR, dir)).isDirectory();

    if (isDirectory) {
      entries[dir] = resolve(SANDBOX_DIR, dir, 'index.js');
    }

    return entries;
  }, {});
}

export default defineConfig({
  root: 'sandbox',
  server: {
    port: 5174 // Use a different port than the docs server
  },
  build: {
    outDir: '__build__',
    rollupOptions: {
      input: buildEntries()
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