<script setup lang="ts">
import { useRoute } from "#app";
import { CinemasApi } from "@/api/cinemas";
import { MoviesApi } from "@/api/movies";
import { useCinemasStore } from "@/stores/cinemas";

const route = useRoute();
const cinemaId = Number(route.params.cinemaId);

const cinemasStore = useCinemasStore();
await cinemasStore.fetchAll();

const { data: sessions } = await CinemasApi.getSessions(cinemaId);
const { data: movies } = await MoviesApi.getAll();

const cinema = computed(() => cinemasStore.list.find((c) => c.id === cinemaId));

const grouped = computed(() => {
  const map: Record<
    string,
    Record<string, { sessionId: number; time: string; movie: Movie }[]>
  > = {};

  (sessions.value ?? []).forEach((s) => {
    const d = new Date(s.startTime);
    const date = d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });
    const time = d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const movie = movies.value?.find((m) => m.id === s.movieId);
    if (!movie) return;

    if (!map[date]) map[date] = {};
    if (!map[date][movie.title]) map[date][movie.title] = [];

    map[date][movie.title].push({
      sessionId: s.id,
      time,
      movie,
    });
  });

  return map;
});

const {
  public: { imageBase },
} = useRuntimeConfig();

const fullPoster = (posterImage: string) => {
  if (!posterImage) return "";
  if (/^https?:/i.test(posterImage)) return posterImage;
  const base = imageBase.replace(/\/$/, "");
  const path = posterImage.replace(/^\//, "");
  return `${base}/${path}`;
};
</script>

<template>
  <section class="max-w-6xl mx-auto p-6 text-white">
    <h1 class="text-3xl font-bold text-center text-gray-600 mb-10">
      {{ cinema?.name || "Кинотеатр" }}
    </h1>

    <div v-if="!sessions?.length" class="text-gray-400 text-center">
      Сеансов пока нет
    </div>

    <div v-else class="space-y-12">
      <div
        v-for="(movies, date) in grouped"
        :key="date"
        class="border-t border-gray-700 pt-8"
      >
        <h2 class="text-xl font-semibold mb-6 text-gray-600 text-center">
          {{ date }}
        </h2>

        <div
          v-for="(movieSessions, movieTitle) in movies"
          :key="movieTitle"
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 border-b border-gray-800 pb-6"
        >
          <div class="flex items-center gap-5">
            <img
              :src="fullPoster(movieSessions[0].movie.posterImage)"
              :alt="movieSessions[0].movie.title"
              class="w-24 h-32 object-cover rounded-lg border border-gray-700 shadow-sm hover:scale-[1.03] transition-transform duration-200"
              loading="lazy"
            />

            <div>
              <h3 class="text-lg font-semibold text-gray-600">
                {{ movieSessions[0].movie.title }}
              </h3>
              <p class="text-gray-600 text-sm mt-1">
                {{ movieSessions[0].movie.year }}
                <span class="ml-2 text-yellow-400 font-bold"
                  >★ {{ movieSessions[0].movie.rating }}</span
                >
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <NuxtLink
              v-for="s in movieSessions"
              :key="s.sessionId"
              :to="`/movies/${s.movie.id}/session/${s.sessionId}`"
              class="px-4 py-2 border border-gray-500 rounded-lg hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/10 transition text-gray-600"
            >
              {{ s.time }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
