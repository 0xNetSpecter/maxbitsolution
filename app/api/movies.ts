import { useApiFetch } from "@/composables/useApiFetch";
import type { Movie, MovieSession } from "@/types/movies";

export const MoviesApi = {
  getAll() {
    return useApiFetch<Movie[]>("/movies", { default: () => [] });
  },

  getSessions(movieId: number) {
    return useApiFetch<MovieSession[]>(`/movies/${movieId}/sessions`, {
      default: () => [],
    });
  },
};
