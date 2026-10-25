import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      // The quiz, and the figure page that the notes embed in an iframe.
      input: { main: 'index.html', embed: 'embed.html' },
    },
  },
})
