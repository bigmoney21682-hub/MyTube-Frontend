import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/MyTube-Frontend/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
