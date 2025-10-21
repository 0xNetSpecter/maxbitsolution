<template>
  <div
    v-if="movies?.length"
    class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <MovieCard v-for="m in movies" :key="m.id" :movie="m" />
  </div>

  <p v-else class="text-gray-400">Нет фильмов</p>
</template>

<script setup lang="ts">
import type { Movie } from "~/types/movies";
import MovieCard from "./MovieCard.vue";

defineProps<{
  movies: Movie[] | undefined;
}>();
</script>
