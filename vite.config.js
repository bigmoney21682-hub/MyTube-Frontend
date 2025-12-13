import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // default output folder for Vite
  },
  base: "./", // ensures relative paths so GitHub Pages works
});
