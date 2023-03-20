import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import requireTransform from "vite-plugin-require-transform";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [requireTransform({}), preact()],
});
