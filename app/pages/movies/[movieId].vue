<script setup lang="ts">
import { useMoviesStore } from "@/stores/movies";
import { useMovieDetails } from "@/composables/useMovieDetails";
import MovieDetails from "@/components/movies/MovieDetails.vue";
import MovieSessions from "@/components/movies/MovieSessions.vue";

const route = useRoute();
const movieId = Number(route.params.movieId);

const moviesStore = useMoviesStore();

// берём данные из стора, чтобы не дергать API повторно
const movie = computed(() =>
  moviesStore.lastSelected?.id === movieId
    ? moviesStore.lastSelected
    : moviesStore.movies.find((m) => m.id === movieId)
);

// ⚙️ Загружаем сеансы
const { grouped } = await useMovieDetails(movieId);
</script>

<template>
  <section class="max-w-6xl mx-auto p-6" v-if="movie">
    <MovieDetails :movie="movie" />
    <MovieSessions :grouped="grouped" :movie-id="movieId" />
  </section>

  <div v-else class="text-gray-400 text-center py-10">Загрузка фильма...</div>
</template>
