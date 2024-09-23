import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 3001,
    host: true,
    strictPort: true,
  },
  test: {
    dir: 'src',
    alias: {
      '@/': resolve(__dirname, 'src/'),
    },
    environment: 'jsdom',
    include: ['**/*.test.*', '**/*.spec.*'],
    globals: true,
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      all: false,
      exclude: [...coverageConfigDefaults.exclude],
    },
    logHeapUsage: true,
  },
});
