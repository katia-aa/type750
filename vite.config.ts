import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

export default defineConfig({
  base: "/type750", // Ensure this matches your repository name
  plugins: [react(), TanStackRouterVite()],
  build: {
    outDir: "dist", // Output directory
    rollupOptions: {
      input: "index.html", // Ensure the input HTML file is correct
    },
  },
});
