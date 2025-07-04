import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://triksha-backend-f5f0cth4f9c0b8g9.southindia-01.azurewebsites.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
