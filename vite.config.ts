import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }: { mode: string }) => {  // Load .env variables based on current mode (development/production)
  
  const env = loadEnv(mode, process.cwd(), "");

  // Convert comma-separated string to array
  const allowedHosts = (env.ALLOWED_HOSTS || "").split(",").map(h => h.trim());

  console.log("Allowed Hosts ");
  console.log(allowedHosts);
    


  return defineConfig({
    plugins: [react()],    
    server: {
      host: "0.0.0.0",
      allowedHosts,
    },
  });
};
