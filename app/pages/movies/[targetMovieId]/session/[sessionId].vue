<script setup lang="ts">
import { useRoute } from "#app";
import { SessionsApi } from "@/api/sessions";
import { useCinemasStore } from "@/stores/cinemas";
import { useMoviesStore } from "@/stores/movies";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const movieId = Number(route.params.targetMovieId);
const sessionId = Number(route.params.sessionId);

const router = useRouter();
const user = useUserStore();

const { data: session } = await SessionsApi.getDetails(sessionId);

const selectedSeats = ref<{ rowNumber: number; seatNumber: number }[]>([]);

function toggleSeat(rowNumber: number, seatNumber: number) {
  const i = selectedSeats.value.findIndex(
    (s) => s.rowNumber === rowNumber && s.seatNumber === seatNumber
  );
  i >= 0
    ? selectedSeats.value.splice(i, 1)
    : selectedSeats.value.push({ rowNumber, seatNumber });
}

const isBooked = (row: number, seat: number) =>
  session.value.bookedSeats.some(
    (b: any) => b.rowNumber === row && b.seatNumber === seat
  );

const isSelected = (row: number, seat: number) =>
  selectedSeats.value.some((s) => s.rowNumber === row && s.seatNumber === seat);

async function bookSelected() {
  if (!user.token) {
    await router.push({
      path: "/auth/login",
      query: { redirect: route.fullPath },
    });
    return;
  }

  if (selectedSeats.value.length === 0) {
    return;
  }

  try {
    const { data, error } = await SessionsApi.bookSeats(
      sessionId,
      selectedSeats.value
    );

    if (error.value) {
      const msg =
        error.value.data?.message || "Не удалось забронировать места.";
      return;
    }

    selectedSeats.value = [];

    await router.push("/tickets");
  } catch (e: any) {
    console.error(e);
  }
}
const moviesStore = useMoviesStore();
const cinemasStore = useCinemasStore();

await cinemasStore.fetchAll();

const movie = computed(() =>
  moviesStore.lastSelected?.id === movieId
    ? moviesStore.lastSelected
    : moviesStore.movies.find((m) => m.id === movieId)
);

const cinemaName = computed(() =>
  cinemasStore.getNameById(session.value?.cinemaId ?? 0)
);
</script>

<template>
  <section class="max-w-4xl mx-auto p-6 text-gray-600">
    <h1 class="text-3xl font-bold mb-8 text-center">Выбрать места</h1>

    <div v-if="session" class="mb-6 text-center">
      <p>Фильм: {{ movie?.title }}</p>
      <p>Кинотеатр: {{ cinemaName }}</p>
      <p>
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

    <div
      v-if="session"
      class="relative max-w-full max-h-[70vh] overflow-auto rounded-lg p-4"
    >
      <div class="inline-block min-w-max space-y-3">
        <div class="flex items-center gap-2 justify-start mb-2">
          <span class="w-16"></span>
          <div class="flex gap-2">
            <span
              v-for="seat in session.seats.seatsPerRow"
              :key="'header-' + seat"
              class="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
            >
              {{ seat }}
            </span>
          </div>
        </div>

        <div
          v-for="row in session.seats.rows"
          :key="row"
          class="flex items-center gap-2 justify-start"
        >
          <span class="w-16 text-right text-gray-400 shrink-0"
            >ряд {{ row }}</span
          >
          <div class="flex gap-2">
            <button
              v-for="seat in session.seats.seatsPerRow"
              :key="seat"
              :disabled="isBooked(row, seat)"
              @click="toggleSeat(row, seat)"
              class="w-8 h-8 rounded border transition cursor-pointer flex-shrink-0"
              :class="[
                isBooked(row, seat)
                  ? 'bg-red-500 cursor-not-allowed'
                  : isSelected(row, seat)
                  ? 'bg-blue-500'
                  : 'hover:bg-gray-700',
              ]"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex gap-3 items-center justify-center">
      <button
        class="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 cursor-pointer"
        :disabled="!selectedSeats.length"
        @click="bookSelected"
      >
        Забронировать ({{ selectedSeats.length }})
      </button>

      <button
        class="px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-500 cursor-pointer"
        @click="selectedSeats = []"
        :disabled="!selectedSeats.length"
      >
        Сбросить выбор
      </button>
    </div>
  </section>
</template>
