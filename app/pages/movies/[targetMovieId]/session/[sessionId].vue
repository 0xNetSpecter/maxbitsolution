<script setup lang="ts">
import { useRoute } from "#app";
import { useSessionDetails } from "@/composables/useSessionDetails";
import SessionSeats from "@/components/movies/SessionSeats.vue";

const route = useRoute();
const movieId = Number(route.params.targetMovieId);
const sessionId = Number(route.params.sessionId);

const {
  session,
  movie,
  cinemaName,
  selectedSeats,
  isBooked,
  isSelected,
  toggleSeat,
  bookSelected,
  error,
} = await useSessionDetails(sessionId, movieId);
</script>

<template>
  <section class="max-w-4xl mx-auto p-6 text-gray-200">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-600">
      Выбрать места
    </h1>

    <div v-if="session" class="mb-6 text-center">
      <p class="text-gray-600">Фильм: {{ movie?.title }}</p>
      <p class="text-gray-600">Кинотеатр: {{ cinemaName }}</p>
      <p class="text-gray-600">
        Время:
        {{
          new Date(session.startTime).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </p>
    </div>

    <SessionSeats
      v-if="session"
      :session="session"
      :isBooked="isBooked"
      :isSelected="isSelected"
      :toggleSeat="toggleSeat"
    />

    <div class="mt-6 flex gap-3 items-center justify-center">
      <button
        class="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 cursor-pointer"
        :disabled="!selectedSeats.length"
        @click="bookSelected"
      >
        Забронировать ({{ selectedSeats.length }})
      </button>

      <button
        class="px-4 py-2 rounded-lg border border-gray-600 text-gray-600 hover:border-gray-500 cursor-pointer"
        @click="selectedSeats = []"
        :disabled="!selectedSeats.length"
      >
        Сбросить выбор
      </button>
    </div>
    <div class="text-red-400">{{ error }}</div>
  </section>
</template>
