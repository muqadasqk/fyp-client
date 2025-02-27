import react from "@vitejs/plugin-react";
// import { API_BASE_URL } from "./src/config/env";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@app": path.resolve(__dirname, "src/app"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@features": path.resolve(__dirname, "src/features"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@schemas": path.resolve(__dirname, "src/schemas"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@services": path.resolve(__dirname, "src/services"),
      "@config": path.resolve(__dirname, "src/config"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },

  server: {
    proxy: {
      "/api": 'http://127.0.0.1:8000'
      // { 
      //   target: '',
      //   changeOrigin: true,
      //   secure: false, // Set to true if using HTTPS backend
      //   rewrite: (path) => path.replace(/^\/api/, ''), // Remove "/api" prefix before forwarding
      // },
    },
  },
});
