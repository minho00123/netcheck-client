import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    testMatch: ["./src/spec/*.spec.jsx"],
    coverage: {
      provider: "v8",
      reporter: ["text"],
      exclude: ["*.config.js", "*.cjs", "**/atoms/**", "**/main.jsx"],
    },
  },
});
