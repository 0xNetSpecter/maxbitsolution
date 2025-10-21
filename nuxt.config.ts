import { ROUTE_RULES } from "./config/routes";
import { loadEnv } from "vite";

const mode = process.env.NODE_ENV || "development";
const env = loadEnv(mode, process.cwd());

export default defineNuxtConfig({
  compatibilityDate: "2025-10-21",

  ssr: env.NUXT_SSR_ENABLED === "true",

  devtools: { enabled: env.NUXT_DEVTOOLS_ENABLED === "true" },

  routeRules: ROUTE_RULES,

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt"],

  runtimeConfig: {
    apiBase: env.NUXT_API_INTERNAL_BASE || "http://localhost:3022",
    public: {
      apiBase: env.NUXT_PUBLIC_API_BASE || "/api",
      imageBase:
        env.NUXT_PUBLIC_IMAGE_BASE ||
        "http://localhost:3022/static/images/posters",
    },
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  build: {
    transpile: ["@headlessui/vue"],
  },

  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:3022",
        changeOrigin: true,
      },
    },
  },
});
