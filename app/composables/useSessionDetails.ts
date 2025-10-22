import { ref, computed } from "vue";
import { useRouter, useRoute } from "#app";
import { SessionsApi } from "@/api/sessions";
import { MoviesApi } from "@/api/movies";
import { useUserStore } from "@/stores/user";
import { useCinemasStore } from "@/stores/cinemas";
import { useMoviesStore } from "@/stores/movies";

export const useSessionDetails = async (sessionId: number, movieId: number) => {
  const router = useRouter();
  const route = useRoute();
  const user = useUserStore();
  const cinemasStore = useCinemasStore();
  const moviesStore = useMoviesStore();

  const error = ref<string>("");

  await cinemasStore.fetchAll();

  const { data: session } = await SessionsApi.getDetails(sessionId);
  const selectedSeats = ref<{ rowNumber: number; seatNumber: number }[]>([]);

  const toggleSeat = (row: number, seat: number) => {
    const i = selectedSeats.value.findIndex(
      (s) => s.rowNumber === row && s.seatNumber === seat
    );
    i >= 0
      ? selectedSeats.value.splice(i, 1)
      : selectedSeats.value.push({ rowNumber: row, seatNumber: seat });
  };

  const isBooked = (row: number, seat: number) =>
    session.value?.bookedSeats?.some(
      (b: any) => b.rowNumber === row && b.seatNumber === seat
    );

  const isSelected = (row: number, seat: number) =>
    selectedSeats.value.some(
      (s) => s.rowNumber === row && s.seatNumber === seat
    );

  async function bookSelected() {
    if (!user.token) {
      await router.push({
        path: "/auth/login",
        query: { redirect: route.fullPath },
      });
      return;
    }

    if (!selectedSeats.value.length) return;

    try {
      const { error } = await SessionsApi.bookSeats(
        sessionId,
        selectedSeats.value
      );
      if (error.value) throw new Error(error.value.data?.message);

      selectedSeats.value = [];
      await router.push("/tickets");
    } catch (e) {
      console.error("Ошибка при бронировании", e);
      error.value = "Ошибка при бронировании";
    }
  }

  let movieData =
    moviesStore.lastSelected?.id === movieId
      ? moviesStore.lastSelected
      : moviesStore.movies.find((m) => m.id === movieId);

  if (!movieData) {
    try {
      const allMovies = await MoviesApi.getAll();
      movieData = allMovies.find((m) => m.id === movieId) || null;
      if (movieData) moviesStore.addMovie(movieData);
    } catch (err: string) {
      console.error("Ошибка при загрузке фильмов:", err);
      error.value = "Ошибка при загрузке фильмов";
    }
  }

  const movie = computed(() => movieData);
  const cinemaName = computed(() =>
    cinemasStore.getNameById(session.value?.cinemaId ?? 0)
  );

  return {
    session,
    selectedSeats,
    toggleSeat,
    isBooked,
    isSelected,
    bookSelected,
    movie,
    cinemaName,
    error,
  };
};
