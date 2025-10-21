<script setup lang="ts">
import { useRoute } from "#imports";
import { useCinemas } from "@/composables/useCinemas";
import PosterImage from "~/components/common/PosterImage.vue";

const route = useRoute();
const cinemaId = Number(route.params.cinemaId);
const {
  cinemas,
  grouped,
  fetchCinemas,
  fetchCinemaSessions,
  fetchMovies,
  loading,
  error,
} = useCinemas();

await Promise.all([
  fetchCinemas(),
  fetchCinemaSessions(cinemaId),
  fetchMovies(),
]);
</script>

<template>
  <section class="max-w-6xl mx-auto p-6 text-white">
    <h1 class="text-3xl font-bold text-center text-gray-600 mb-10">
      {{ cinemas.find((c) => c.id === cinemaId)?.name || "Кинотеатр" }}
    </h1>

    <div v-if="loading" class="text-gray-400 text-center">Загрузка...</div>
    <div v-else-if="error" class="text-red-400 text-center">{{ error }}</div>

    <div
      v-else-if="!Object.keys(grouped).length"
      class="text-gray-400 text-center"
    >
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
            <PosterImage
              :src="movieSessions[0].movie.posterImage"
              :alt="movieSessions[0].movie.title"
              class="w-24 h-32 rounded-lg border border-gray-700 shadow-sm hover:scale-[1.03] transition-transform duration-200"
              cover
            />
            <div>
              <h3 class="text-lg font-semibold text-gray-600">
                {{ movieSessions[0].movie.title }}
              </h3>
              <p class="text-gray-600 text-sm mt-1">
                {{ movieSessions[0].movie.year }}
                <span class="ml-2 text-yellow-400 font-bold">
                  ★ {{ movieSessions[0].movie.rating }}
                </span>
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
