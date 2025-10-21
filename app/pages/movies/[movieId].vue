<script setup lang="ts">
import { MoviesApi } from "@/api/movies";
import { useMoviesStore } from "@/stores/movies";
import { useCinemasStore } from "@/stores/cinemas";
import { useRoute } from "#app";

const route = useRoute();
const movieId = Number(route.params.movieId);

const moviesStore = useMoviesStore();
const cinemasStore = useCinemasStore();

await cinemasStore.fetchAll();

const movie = computed(() =>
  moviesStore.lastSelected?.id === movieId
    ? moviesStore.lastSelected
    : moviesStore.movies.find((m) => m.id === movieId)
);

const { data: sessions } = await MoviesApi.getSessions(movieId);

const validSessions = computed(() => {
  const now = new Date();
  return (sessions.value ?? []).filter((s) => {
    const start = new Date(s.startTime);
    return start.getTime() - now.getTime() > -15 * 60 * 1000;
  });
});

const grouped = computed(() => {
  const map: Record<string, Record<string, any[]>> = {};

  validSessions.value.forEach((s) => {
    const d = new Date(s.startTime);
    const date = d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });
    const time = d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const cinemaName = cinemasStore.getNameById(s.cinemaId);

    if (!map[date]) map[date] = {};
    if (!map[date][cinemaName]) map[date][cinemaName] = [];
    map[date][cinemaName].push({ ...s, startTime: time });
  });

  return map;
});

const {
  public: { imageBase },
} = useRuntimeConfig();

const fullPoster = computed(() => {
  const base = imageBase.replace(/\/$/, "");
  const path = movie.value?.posterImage?.replace(/^\//, "") ?? "";
  return `${base}/${path}`;
});
</script>

<template>
  <section class="max-w-6xl mx-auto p-6" v-if="movie">
    <div class="flex flex-col md:flex-row gap-6 mb-10">
      <img
        :src="fullPoster"
        alt="Постер фильма"
        class="w-64 h-96 object-cover rounded-xl shadow-lg"
      />
      <div>
        <h1 class="text-3xl font-bold text-gray-600 mb-4">{{ movie.title }}</h1>
        <p class="text-gray-300 mb-4">{{ movie.description }}</p>
        <ul class="text-gray-400 space-y-1">
          <li>Год: {{ movie.year }}</li>
          <li>Продолжительность: {{ movie.lengthMinutes }} мин</li>
          <li>Рейтинг: ★ {{ movie.rating }}</li>
        </ul>
      </div>
    </div>

    <div v-for="(cinemas, date) in grouped" :key="date" class="mb-8">
      <h2 class="text-2xl font-semibold mb-3 text-gray-600">{{ date }}</h2>
      <hr class="border-gray-700 mb-4" />
      <div
        v-for="(sessions, cinemaName) in cinemas"
        :key="cinemaName"
        class="mb-6"
      >
        <h3 class="text-lg font-medium text-gray-600 mb-2">{{ cinemaName }}</h3>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="session in sessions"
            :key="session.id"
            :to="`/movies/${movieId}/session/${session.id}`"
            class="px-4 py-2 rounded-lg border border-gray-600 hover:border-blue-400 hover:text-blue-400 transition"
          >
            {{ session.startTime }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <div v-else class="text-gray-400 text-center py-10">Загрузка фильма...</div>
</template>
