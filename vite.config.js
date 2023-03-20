import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  root: 'src',
  build: { outDir: '../dist' },
  envDir: '..',
  resolve: {
    alias: {
      buffer: 'buffer/',
      cbor: 'cbor-web',
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
