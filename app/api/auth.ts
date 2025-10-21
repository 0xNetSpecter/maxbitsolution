import { useApiFetch } from "@/composables/useApiFetch";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "@/types/auth";

export const AuthApi = {
  login(payload: LoginRequest) {
    return useApiFetch<LoginResponse, LoginRequest>("/login", {
      method: "post",
      body: payload,
    });
  },

  register(payload: RegisterRequest) {
    return useApiFetch<null, RegisterRequest>("/register", {
      method: "post",
      body: payload,
      default: () => null,
    });
  },
};
