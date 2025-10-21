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

  typescript: { strict: true },

  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt"],

  runtimeConfig: {
    apiBase: env.PRIVATE_API_BASE || "",
    public: {
      apiBase: env.PUBLIC_API_BASE || "/api",
      imageBase: env.NUXT_PUBLIC_IMAGE_BASE || "",
    },
  },

  nitro: {
    preset: env.NITRO_PRESET || undefined,
    devProxy: {
      "/api": {
        target: env.DEV_API_TARGET || "http://localhost:3022",
        changeOrigin: true,
      },
    },
  },
});
