<script setup lang="ts">
import AuthForm from "@/components/auth/AuthForm.vue";
import { useAuthForm } from "@/composables/useAuthForm";

const { username, password, passwordConfirm, errorMessage, loading, submit } =
  useAuthForm("register");
</script>

<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center text-white px-6"
  >
    <div class="max-w-sm w-full">
      <h1 class="text-3xl font-semibold text-center text-gray-100 mb-8">
        Регистрация
      </h1>

      <AuthForm
        mode="register"
        v-model:username="username"
        v-model:password="password"
        v-model:passwordConfirm="passwordConfirm"
        :error-message="errorMessage"
        :loading="loading"
        @submit="submit"
      />

      <div class="mt-8 text-center text-sm text-gray-400">
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
