<script setup lang="ts">
import AuthForm from "@/components/auth/AuthForm.vue";
import { useAuthForm } from "@/composables/useAuthForm";

const { username, password, errorMessage, loading, submit } =
  useAuthForm("login");
</script>

<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center text-white px-6"
  >
    <div class="max-w-sm w-full">
      <h1 class="text-3xl font-semibold text-center text-gray-600 mb-8">
        Вход
      </h1>

      <AuthForm
        mode="login"
        v-model:username="username"
        v-model:password="password"
        :error-message="errorMessage"
        :loading="loading"
        @submit="submit"
      />

      <div class="mt-8 text-center text-sm text-gray-400 cursor-pointer">
        Нет аккаунта?
        <NuxtLink
          to="/auth/register"
          class="text-blue-400 underline hover:text-blue-300"
        >
          Зарегистрируйтесь
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
