/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-grid-examples/',
  build: {
    chunkSizeWarningLimit: 10 * 1024 * 1024, // 10 MB
  },
  plugins: [
    react(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: './projects/sales-grid/public/*',
    //       dest: 'public',
    //     }
    //   ]
    // })
  ],
  resolve: {
    mainFields: ['module'],
    alias: {
      '@hr-assets': path.resolve(__dirname, 'projects/hr-portal/src/app/hr-portal/assets/images')
    }
  },
  server: {
    open: true,
    port: 3003,
    fs: {
      allow: ['.', 'projects']
    }
  }
})
