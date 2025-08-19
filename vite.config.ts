import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-grid-examples/',
  build: {
    chunkSizeWarningLimit: 10 * 1024 * 1024, // 10 MB
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './projects/grids/sales-grid/public/*',
          dest: 'public',
        },
        {
          src: './projects/grids/erp-hierarchical-grid/public/*',
          dest: '',
        },
        {
          src: './projects/grids/finance-grid/public/**',
          dest: '',
        },
        {
          src: './projects/grids/hr-portal/public/**',
          dest: '',
        },
        {
          src: './projects/grids/fleet-management-grid/public/**',
          dest: 'grids',
        },
      ],
    }),
  ],
  resolve: {
    mainFields: ['module'],
  },
  server: {
    open: true,
    port: 3003,
  },
});
