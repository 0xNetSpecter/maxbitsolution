<script setup lang="ts">
import { useMovies } from "@/composables/useMovies";
import MoviesGrid from "@/components/movies/MoviesGrid.vue";

const { movies, pending, error } = useMovies();
</script>

<template>
  <section class="max-w-7xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold">Фильмы</h1>

    <div v-if="error" class="text-red-400">
      Ошибка загрузки фильмов: {{ error.message || error }}
    </div>

    <div v-else-if="pending" class="grid grid-cols-4 gap-6">
      <div
        v-for="n in 8"
        :key="n"
        class="h-80 bg-gray-800 animate-pulse rounded-2xl"
      />
    </div>

    <MoviesGrid v-else :movies="movies" />
  </section>
</template>
