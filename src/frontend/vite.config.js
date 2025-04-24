import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './public',
  publicDir: './public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions:{
      external:['@popperjs/core']
    }
  }
})
