import { defineConfig } from 'vite'
import viteSvgr from "vite-plugin-svgr";
import viteReact from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), viteSvgr()],
})
