<script setup lang="ts">
import { useCinemas } from "@/composables/useCinemas";

const { cinemas, loading, error, fetchCinemas } = useCinemas();

await fetchCinemas();
</script>

<template>
  <section class="max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-200">🎭 Кинотеатры</h1>

    <div v-if="loading" class="text-gray-400 text-center">Загрузка...</div>
    <div v-else-if="error" class="text-red-400 text-center">{{ error }}</div>
    <div v-else-if="!cinemas.length" class="text-gray-400 text-center">
      Кинотеатров пока нет 😢
    </div>

    <ul v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <li
        v-for="cinema in cinemas"
        :key="cinema.id"
        class="bg-neutral-900 border border-neutral-700 p-5 rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-blue-500/20 transition"
      >
        <h2 class="text-xl font-semibold text-white mb-2">{{ cinema.name }}</h2>
        <p class="text-gray-400 mb-1">{{ cinema.address }}</p>
        <p class="text-gray-500 text-sm mb-4">{{ cinema.phone }}</p>

        <NuxtLink
          :to="`/cinemas/${cinema.id}`"
          class="block text-center border border-blue-500 text-blue-400 rounded-lg py-2 mt-auto hover:bg-blue-500 hover:text-white transition"
        >
          Просмотреть сеансы
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
