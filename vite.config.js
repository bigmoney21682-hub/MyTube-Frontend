import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/MyTube-Frontend/", // important for GitHub Pages
  server: {
    port: 5173,
    proxy: {
      "/api": "https://mytube-backend-xlz4.onrender.com" // live backend
    }
  },
  build: {
    outDir: "dist"
  }
});
