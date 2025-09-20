import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: true, // allow any host in dev [web:73][web:127]
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true, // allow any host in preview [web:83]
  },
});

