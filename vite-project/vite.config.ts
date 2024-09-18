import { defineConfig } from "vite";

export default defineConfig({
  base: "rubik",
  cacheDir: "../node_modules/.vite",
  resolve: {
    preserveSymlinks: true,
  },
});
