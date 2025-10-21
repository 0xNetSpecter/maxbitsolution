<script setup lang="ts">
import { useFetch } from "#app";

const { data: cinemas, pending, error } = await useFetch("/api/cinemas");
</script>

<template>
  <section class="max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Кинотеатры</h1>

    <div v-if="pending" class="text-gray-400">Загрузка...</div>
    <div v-else-if="error" class="text-red-400">
      Ошибка: {{ error.message }}
    </div>

    <ul v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="cinema in cinemas"
        :key="cinema.id"
        class="bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold text-white">{{ cinema.name }}</h2>
        <p class="text-gray-400">{{ cinema.address }}</p>
        <p class="text-gray-400 text-sm">{{ cinema.phone }}</p>
      </li>
    </ul>
  </section>
</template>
