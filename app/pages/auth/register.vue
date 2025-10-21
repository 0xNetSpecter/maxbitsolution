<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "#app";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const route = useRoute();
const user = useUserStore();

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const loading = ref(false);

function validate() {
  errorMessage.value = "";

  if (
    !username.value.trim() ||
    !password.value.trim() ||
    !confirmPassword.value.trim()
  ) {
    errorMessage.value = "Все поля обязательны для заполнения";
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

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Пароли не совпадают";
    return false;
  }

  return true;
}

async function onRegister() {
  if (!validate()) return;

  loading.value = true;
  errorMessage.value = "";

  try {
    const { success, message } = await user.register(
      username.value.trim(),
      password.value.trim()
    );

    if (!success) {
      errorMessage.value = message;
      return;
    }

    const redirect = (route.query.redirect as string) || "/tickets";
    await router.push(redirect);
  } catch (err) {
    console.error(err);
    errorMessage.value = "Ошибка регистрации. Попробуйте позже.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center text-white px-6"
  >
    <div class="max-w-sm w-full">
      <h1 class="text-3xl font-semibold text-center text-gray-600 mb-8">
        Регистрация
      </h1>

      <form
        class="space-y-6 p-6 rounded-xl border border-neutral-700"
        @submit.prevent="onRegister"
      >
        <div>
          <label class="flex flex-col gap-y-2 text-sm mb-2 text-gray-600">
            <span>Логин</span>
            <input
              v-model="username"
              type="text"
              placeholder="Введите логин"
              autocomplete="username"
              class="w-full bg-transparent border border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>

        <div>
          <label class="flex flex-col gap-y-2 text-sm mb-2 text-gray-600">
            <span>Пароль</span>
            <input
              v-model="password"
              type="password"
              placeholder="Введите пароль"
              autocomplete="new-password"
              class="w-full bg-transparent border border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>

        <div>
          <label class="flex flex-col gap-y-2 text-sm mb-2 text-gray-600"
            ><span>Подтверждение пароля</span>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              autocomplete="new-password"
              class="w-full bg-transparent border border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>

        <p
          v-if="errorMessage"
          class="text-red-400 text-sm text-center leading-snug"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full mt-4 py-2 rounded-md border border-blue-500 cursor-pointer text-blue-400 hover:bg-blue-500 hover:text-white transition disabled:opacity-50"
        >
          {{ loading ? "Ожидаем регистрацию аккаунта" : "Зарегистрироваться" }}
        </button>
      </form>

      <div class="mt-8 text-center text-sm text-gray-400 cursor-pointer">
        Уже есть аккаунт?
        <NuxtLink
          to="/auth/login"
          class="text-blue-400 underline hover:text-blue-300"
        >
          Войти
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
input::placeholder {
  color: #666;
}
</style>
