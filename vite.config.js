// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/MyTube-Frontend/",   // correct for GitHub Pages
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",     // 🔥 FORCE VITE TO INJECT SCRIPT TAG
    },
  },
});
