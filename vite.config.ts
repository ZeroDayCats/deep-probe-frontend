import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["probe.sangonomiya.icu"], // dev server allowlist [web:73]
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: "probe.sangonomiya.icu",   // preview allowlist (string | true) [web:83]
  },
});

