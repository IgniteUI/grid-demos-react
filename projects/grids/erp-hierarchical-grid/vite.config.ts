import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 10 * 1024 * 1024, // 10 MB
  },
  plugins: [react()],
  resolve: {
    mainFields: ['module'],
  },
  server: {
    open: true,
    port: 3003
  }
})
