import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/MyTube-Frontend/", // GitHub Pages requires this for correct asset paths
  server: {
    port: 5173,
    proxy: {
      // All API calls starting with /api will go to your live backend
      "/api": "https://mytube-backend-xlz4.onrender.com"
    }
  },
  build: {
    outDir: "dist", // Output directory for production build
    sourcemap: false, // optional: disables source maps for smaller build
  },
  resolve: {
    alias: {
      // optional: useful if you have absolute imports
      "@": "/src",
    },
  },
});
