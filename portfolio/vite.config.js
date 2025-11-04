import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Root path for GitHub Pages (chopkins0107.github.io)
  plugins: [react()],
})
