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
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit
  },
});
