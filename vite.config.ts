import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Base relativa: funciona tanto en un dominio propio como en un subdirectorio.
  base: './',
  plugins: [react(), tailwindcss()],
})
