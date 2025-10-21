import { useApiFetch } from "@/composables/useApiFetch";
import type { Movie, MovieSession } from "@/types/movies";

export const MoviesApi = {
  getAll() {
    return useApiFetch<Movie[]>("/movies", { default: () => [] });
  },

  getById(movieId: number) {
    return useApiFetch<Movie>(`/movies/${movieId}`, {
      default: () =>
        ({
          id: 0,
          title: "",
          description: "",
          year: 0,
          lengthMinutes: 0,
          posterImage: "",
          rating: 0,
        } as Movie),
    });
  },

  getSessions(movieId: number) {
    return useApiFetch<MovieSession[]>(`/movies/${movieId}/sessions`, {
      default: () => [],
    });
  },
};
