import { defineStore } from "pinia";
import { AuthApi } from "@/api/auth";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

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
        const { data, error } = await AuthApi.login({ username, password });

        if (error.value) {
          const message =
            error.value.data?.message ||
            "Неверный логин или пароль. Проверьте введенные данные и попробуйте снова";
          return { success: false, message };
        }

        const token = data.value?.token;
        if (!token) throw new Error("Token not received");

        this.token = token;
        this.username = username;
        this.isLoaded = true;

        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_username", username);

        return { success: true };
      } catch (err: any) {
        console.error("[Login Error]", err);
        return {
          success: false,
          message: "Ошибка входа. Попробуйте позже.",
        };
      }
    },

    async register(username: string, password: string) {
      try {
        const payload: RegisterRequest = {
          username,
          password,
        };

        const { error } = await AuthApi.register(payload);

        if (error.value) {
          const msg = error.value.data?.message || "Ошибка регистрации";
          return { success: false, message: msg };
        }

        const loginRes = await this.login(username, password);
        return loginRes;
      } catch (err: any) {
        console.error("[Register Error]", err);
        return {
          success: false,
          message: "Ошибка регистрации. Попробуйте позже.",
        };
      }
    },

    logout() {
      this.token = null;
      this.username = "";
      this.isLoaded = false;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_username");
    },

    restoreSession() {
      const savedToken = localStorage.getItem("auth_token");
      const savedUsername = localStorage.getItem("auth_username");

      if (savedToken) {
        this.token = savedToken;
        this.username = savedUsername || "";
        this.isLoaded = true;
      } else {
        this.isLoaded = true;
      }
    },

    setToken(token: string) {
      this.token = token;
      localStorage.setItem("auth_token", token);
    },
  },
});
