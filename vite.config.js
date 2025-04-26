import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/teacher-page/',  // Make sure this matches the name of your GitHub repository
  plugins: [react()],
})
