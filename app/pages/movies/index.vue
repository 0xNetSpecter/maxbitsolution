<script setup lang="ts">
import { MoviesApi } from "@/api/movies";
import MoviesGrid from "@/components/movies/MoviesGrid.vue";

const { data: movies, status, error } = await MoviesApi.getAll();
</script>

<template>
  <section class="max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Фильмы</h1>

    <div v-if="status === 'pending'" class="text-gray-400">
      Загрузка фильмов…
    </div>
    <div v-else-if="error" class="text-red-400">
      Ошибка: {{ error.message }}
    </div>

    <MoviesGrid v-else :movies="movies" />
  </section>
</template>
