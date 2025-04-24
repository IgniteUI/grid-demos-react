import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Use root path for local development
  build: {
    chunkSizeWarningLimit: 10 * 1024 * 1024, // 10 MB
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@hr-assets': path.resolve(__dirname, 'projects/hr-portal//public/images'),
    },
  },
  server: {
    open: true,
    port: 3003,
    fs: {
      allow: ['.', 'projects'],
    },
  },
});
