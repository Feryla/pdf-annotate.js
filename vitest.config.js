import { defineConfig } from 'vitest/config';

export default defineConfig({
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
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.js'],
      exclude: ['**/node_modules/**', '**/test/**', '**/dist/**'],
    },
    include: ['test/**/*.spec.js'],
  },
});