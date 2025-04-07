import { defineConfig } from 'vite';
import { resolve } from 'path';

// Build configuration for the main library
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'PDFAnnotate',
      fileName: (format) => {
        if (process.env.MINIFY) {
          return `pdf-annotate.min.js`;
        }
        return `pdf-annotate.js`;
      },
      formats: ['umd']
    },
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      external: ['pdfjs-dist'],
      output: {
        globals: {
          'pdfjs-dist': 'pdfjsLib'
        }
      }
    }
  },
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        features: {
          canvas: true
        }
      }
    },
    setupFiles: ['./test/setup.js'],
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      provider: 'v8'
    },
    include: ['test/**/*.spec.js'],
    exclude: ['node_modules/**', 'dist/**']
  }
});