<script setup lang="ts">
const props = defineProps<{
  mode: "login" | "register";
  errorMessage: string;
  loading: boolean;
  username: string;
  password: string;
  passwordConfirm?: string;
}>();

const emits = defineEmits<{
  (e: "update:username", v: string): void;
  (e: "update:password", v: string): void;
  (e: "update:passwordConfirm", v: string): void;
  (e: "submit"): void;
}>();

function handleInputUsername(e: Event) {
  const target = e.target as HTMLInputElement | null;
  if (target) emits("update:username", target.value);
}

function handleInputPassword(e: Event) {
  const target = e.target as HTMLInputElement | null;
  if (target) emits("update:password", target.value);
}

function handleInputPasswordConfirm(e: Event) {
  const target = e.target as HTMLInputElement | null;
  if (target) emits("update:passwordConfirm", target.value);
}
</script>

<template>
  <form
    class="space-y-6 p-6 rounded-xl border border-neutral-700"
    @submit.prevent="$emit('submit')"
  >
    <label class="flex flex-col gap-y-2 text-sm mb-2 text-gray-400">
      <span>Логин</span>
      <input
        :value="username"
        @input="handleInputUsername"
        type="text"
        placeholder="Введите логин"
        class="w-full bg-transparent border border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
      />
    </label>

    <label class="flex flex-col gap-y-2 text-sm mb-2 text-gray-400">
      <span>Пароль</span>
      <input
        :value="password"
        @input="handleInputPassword"
        type="password"
        placeholder="Введите пароль"
        class="w-full bg-transparent border border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
      />
    </label>

    <div v-if="mode === 'register'">
      <label class="flex flex-col gap-y-2 text-sm mb-2 text-gray-400">
        <span>Повторите пароль</span>
        <input
          :value="passwordConfirm"
          @input="handleInputPasswordConfirm"
          type="password"
          placeholder="Повторите пароль"
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
      class="w-full mt-4 py-2 rounded-md border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition disabled:opacity-50 cursor-pointer"
    >
      {{
        loading
          ? "Загрузка..."
          : mode === "login"
          ? "Войти"
          : "Зарегистрироваться"
      }}
    </button>
  </form>
</template>
