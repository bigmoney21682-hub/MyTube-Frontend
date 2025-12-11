import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // REQUIRED for GitHub Pages
  base: "/MyTube-Frontend/",

  server: {
    port: 5173,
    proxy: {
      "/api": "https://mytube-backend-xlz4.onrender.com"
    }
  },

  build: {
    outDir: "dist"
  }
});
