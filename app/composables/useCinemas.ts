import { ref, computed } from "vue";
import { CinemasService } from "@/services/cinemas.service";
import type { Cinema } from "@/types/cinemas";
import type { MovieSession } from "@/types/movies";
import { MoviesApi } from "@/api/movies";

type EnrichedSession = MovieSession & {
  startTimeDate: Date;
  startTimeHHMM: string;
  startDateDDMM: string;
};

export function useCinemas() {
  const cinemas = ref<Cinema[]>([]);
  const sessions = ref<EnrichedSession[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const movies = ref<any[]>([]);

  async function fetchCinemas() {
    loading.value = true;
    error.value = null;
    try {
      cinemas.value = await CinemasService.getAll();
    } catch (e: any) {
      error.value = e.message || "Не удалось загрузить кинотеатры";
    } finally {
      loading.value = false;
    }
  }

  async function fetchCinemaSessions(cinemaId: number) {
    loading.value = true;
    error.value = null;
    try {
      sessions.value = await CinemasService.getSessions(cinemaId);
    } catch (e: any) {
      error.value = e.message || "Не удалось загрузить сеансы";
    } finally {
      loading.value = false;
    }
  }

  async function fetchMovies() {
    loading.value = true;
    error.value = null;
    try {
      movies.value = await MoviesApi.getAll();
    } catch (e: any) {
      console.error("Ошибка при загрузке фильмов:", e);
      error.value = e.message || "Не удалось загрузить фильмы";
      movies.value = [];
    } finally {
      loading.value = false;
    }
  }

  const groupByDate = (list = sessions.value) =>
    list.reduce<Record<string, EnrichedSession[]>>((acc, s) => {
      (acc[s.startDateDDMM] ||= []).push(s);
      return acc;
    }, {});

  const grouped = computed(() => {
    if (!sessions.value.length || !movies.value.length) return {};

    const byDate = groupByDate(sessions.value);
    const result: Record<string, Record<string, any[]>> = {};

    for (const [date, list] of Object.entries(byDate)) {
      for (const s of list) {
        const movie = movies.value.find(
          (m) => Number(m.id) === Number(s.movieId)
        );
        if (!movie) continue;

        result[date] ||= {};
        result[date][movie.title] ||= [];
        result[date][movie.title].push({
          sessionId: s.id,
          time: s.startTimeHHMM,
          movie,
        });
      }
    }
    return result;
  });

  return {
    cinemas,
    sessions,
    movies,
    grouped,
    loading,
    error,
    fetchCinemas,
    fetchCinemaSessions,
    fetchMovies,
  };
}
