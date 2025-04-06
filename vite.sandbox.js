import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import fs from 'fs';

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
    port: 3000
  },
  build: {
    outDir: '__build__',
    rollupOptions: {
      input: buildEntries()
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});