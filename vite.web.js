import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  root: 'docs',
  server: {
    port: 3001
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
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});