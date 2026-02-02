import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // App is deployed at https://hit.edu.in/cse
  // Must NOT reference /v2 (temporary path)
  base: '/cse/',

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})