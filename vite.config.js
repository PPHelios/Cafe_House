import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
//import requireTransform from "vite-plugin-require-transform";
//import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ preact()],
});
// requireTransform({})
// viteCompression({algorithm:'brotliCompress'})