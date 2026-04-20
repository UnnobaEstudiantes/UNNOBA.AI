import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Si 5173 está ocupado, Vite prueba 5174, 5175… (normal)
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'https://unnoba.edu.ar',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // RAG local (:8000); el front puede ser :5173, :5174, etc.
      '/academic-rag': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/academic-rag/, ''),
      },
    },
  },
})
