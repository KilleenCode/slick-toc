import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode, command }) => {
  const plugins = [dts({ insertTypesEntry: true }), react(), visualizer()];
  return {
    plugins,
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "SlickToc",
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],

        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: "React",
          },
        },
      },
    },
  };
});
