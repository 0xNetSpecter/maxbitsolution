import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup/setupTests.ts"],
    alias: {
      "@": path.resolve(__dirname, "./app"),
      "#imports": path.resolve(__dirname, "./.nuxt/imports.d.ts"),
    },
    deps: {
      inline: [/nuxt/, /@nuxt/, /@vue/],
    },
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
  },
});
