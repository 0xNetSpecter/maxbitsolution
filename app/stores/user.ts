import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null as string | null,
    username: "" as string,
    isLoaded: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(username: string, password: string) {
      try {
        const config = useRuntimeConfig();
        const res = await $fetch<{ token: string }>(
          `${config.public.apiBase}/login`,
          {
            method: "POST",
            body: { username, password },
          }
        );

        this.token = res.token;
        this.username = username;
        this.isLoaded = true;

        localStorage.setItem("auth_token", res.token);
        return { success: true };
      } catch (err: any) {
        console.error("[Login Error]", err);
        return {
          success: false,
          message: err?.data?.message || "Ошибка входа",
        };
      }
    },

    async register(username: string, password: string) {
      try {
        const config = useRuntimeConfig();
        await $fetch(`${config.public.apiBase}/register`, {
          method: "POST",
          body: { username, password },
        });
        return { success: true };
      } catch (err: any) {
        console.error("[Register Error]", err);
        return {
          success: false,
          message: err?.data?.message || "Ошибка регистрации",
        };
      }
    },

    logout() {
      this.token = null;
      this.username = "";
      this.isLoaded = false;
      localStorage.removeItem("auth_token");
    },

    restoreSession() {
      const saved = localStorage.getItem("auth_token");
      if (saved) {
        this.token = saved;
        this.isLoaded = true;
      }
    },
  },
});
