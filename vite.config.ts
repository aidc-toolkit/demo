import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    base: "",
    plugins: [react(), svgr()],
    build: {
        rollupOptions: {
            external: [/^node:\w+/u]
        },
        chunkSizeWarningLimit: 1024
    }
});
