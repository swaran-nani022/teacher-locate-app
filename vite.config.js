// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isVercel = process.env.VERCEL === '1';  // Check if deployed on Vercel
  return {
    plugins: [react()],
    base: mode === 'development' || isVercel ? '/' : '/teacher-locate-app/',  // Dynamically set base
  };
})
