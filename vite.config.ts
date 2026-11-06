import reactPlugin from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    base: "",
    plugins: [reactPlugin(), svgrPlugin()],
    build: {
        rolldownOptions: {
            external: [/^node:\w+/u]
        },
        chunkSizeWarningLimit: 1024
    }
});
