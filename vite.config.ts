import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/bundle-analysis.html',
      gzipSize: true,
      brotliSize: true,
    })
  ],

  // App is deployed at https://hit.edu.in/cse
  // Must NOT reference /v2 (temporary path)
  base: '/cse/',

  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          
          // UI libraries
          if (id.includes('lucide-react') || 
              id.includes('@fortawesome')) {
            return 'vendor-ui';
          }
          
          // Animation & carousel
          if (id.includes('framer-motion') || 
              id.includes('react-slick') || 
              id.includes('slick-carousel')) {
            return 'vendor-animation';
          }
          
          // Large JSON data - split separately
          if (id.includes('SecData.json')) {
            return 'data-heavy';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600, // Temporary
  },

  optimizeDeps: {
    include: ['lucide-react'], // Force pre-bundle for tree-shaking
  },
})