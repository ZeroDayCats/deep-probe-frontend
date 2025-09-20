import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  const allowedHosts = (env.ALLOWED_HOSTS || "").split(",").map(h => h.trim());

  server: {
    host: "0.0.0.0",
    allowedHosts
  }
})
