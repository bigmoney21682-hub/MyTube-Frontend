import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/MyTube-Frontend/",   // required for GitHub Pages
  plugins: [react()],
  build: {
    outDir: "dist",            // output folder for the production build
  },
});
