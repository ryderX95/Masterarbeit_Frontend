import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',  // Change the target to support top-level await
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',  // Ensure dependencies are transpiled correctly
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src")}]
  }
})
