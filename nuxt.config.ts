import { ROUTE_RULES } from "./config/routes";
import { fileURLToPath, URL } from "node:url";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  compatibilityDate:
    (process.env.NUXT_COMPATIBILITY_DATE as any) || "2025-07-15",

  ssr: process.env.NUXT_SSR_ENABLED === "true",

  devtools: { enabled: process.env.NUXT_DEVTOOLS_ENABLED === "true" },

  routeRules: ROUTE_RULES,

  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/test-utils", "@pinia/nuxt"],

  vite: {
    plugins: [tsconfigPaths()],
  },

  css: [fileURLToPath(new URL("./assets/styles/main.scss", import.meta.url))],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3022",
      imageBase:
        process.env.NUXT_PUBLIC_IMAGE_BASE ||
        "http://localhost:3022/static/images/posters",
    },
  },

  imports: {
    dirs: ["stores"],
  },

  build: {
    transpile: ["@headlessui/vue"],
  },
});
