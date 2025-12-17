import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/MyTube-Frontend/", // 🔴 MUST MATCH REPO NAME EXACTLY
});
