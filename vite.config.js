import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    minify: 'terser', // Minify using terser
    sourcemap: false, // Disable source maps in production
    base: '/Api-Playground/', // Base URL for the application
    assetsDir: 'assets', // Directory for static assets
  },
})
