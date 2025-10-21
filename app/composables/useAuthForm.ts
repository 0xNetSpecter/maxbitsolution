import { ref } from "vue";
import { useRouter, useRoute } from "#app";
import { useUserStore } from "@/stores/user";

export const useAuthForm = (mode: "login" | "register") => {
  const username = ref("");
  const password = ref("");
  const passwordConfirm = ref("");
  const errorMessage = ref("");
  const loading = ref(false);

  const user = useUserStore();
  const router = useRouter();
  const route = useRoute();

  const validate = () => {
    errorMessage.value = "";

    if (!username.value.trim() || !password.value.trim()) {
      errorMessage.value = "Введите логин и пароль";
      return false;
    }
    if (username.value.includes(" ") || password.value.includes(" ")) {
      errorMessage.value = "Логин и пароль не должны содержать пробелов";
      return false;
    }
    if (username.value.length < 8) {
      errorMessage.value = "Логин должен содержать минимум 8 символов";
      return false;
    }
    if (password.value.length < 8) {
      errorMessage.value = "Пароль должен содержать минимум 8 символов";
      return false;
    }
    if (!/[A-Z]/.test(password.value) || !/\d/.test(password.value)) {
      errorMessage.value =
        "Пароль должен содержать хотя бы одну заглавную букву и одну цифру";
      return false;
    }
    if (mode === "register" && passwordConfirm.value !== password.value) {
      errorMessage.value = "Пароли не совпадают";
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    loading.value = true;
    errorMessage.value = "";

    try {
      if (mode === "login") {
        const { success, message } = await user.login(
          username.value,
          password.value
        );
        if (!success) throw new Error(message);
        const redirect = (route.query.redirect as string) || "/tickets";
        await router.push(redirect);
      } else {
        const { success, message } = await user.register(
          username.value,
          password.value
        );
        if (!success) throw new Error(message);
        const redirect = (route.query.redirect as string) || "/tickets";
        await router.push(redirect);
      }
    } catch (e: any) {
      errorMessage.value = e.message || "Ошибка. Попробуйте позже.";
    } finally {
      loading.value = false;
    }
  };

  return {
    username,
    password,
    passwordConfirm,
    errorMessage,
    loading,
    submit,
  };
};
