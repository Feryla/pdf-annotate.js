import { defineConfig } from 'vite';
import { resolve } from 'path';

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
  plugins: []
});