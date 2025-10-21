<template>
  <aside class="h-screen flex flex-col bg-white dark:bg-gray-800">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
        Maxbitsolution
      </h1>
    </div>

    <nav class="flex-1 p-4 space-y-2">
      <UButton
        v-for="item in menu"
        :key="item.to"
        :label="item.label"
        :icon="item.icon"
        variant="ghost"
        block
        :to="item.to"
        :active="route.path.startsWith(item.to)"
        class="justify-start"
      />
    </nav>

    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <UButton color="primary" @click="handleAuthClick">
        {{ isLoggedIn ? "Выйти" : "Войти" }}
      </UButton>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "#app";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const route = useRoute();
const user = useUserStore();

const isLoggedIn = computed(() => user.isLoggedIn);

const menu = [
  { label: "Фильмы", to: "/movies", icon: "i-heroicons-film" },
  { label: "Кинотеатры", to: "/cinemas", icon: "i-heroicons-building-library" },
  { label: "Мои билеты", to: "/tickets", icon: "i-heroicons-ticket" },
];

function handleAuthClick() {
  if (isLoggedIn.value) {
    user.logout();
    router.push("/movies");
  } else {
    router.push("/auth/login");
  }
}
</script>
