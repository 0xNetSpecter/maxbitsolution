import { MoviesApi } from "@/api/movies";
import type { Movie } from "@/types/movies";

export function useMovies() {
  const {
    data: movies,
    pending,
    error,
    refresh,
  } = useAsyncData<Movie[]>(
    "movies",
    async () => {
      const result = await MoviesApi.getAll();
      return result;
    },
    {
      server: true,
      lazy: false,
      immediate: true,
      default: () => [] as Movie[],
    }
  );

  return { movies, pending, error, refresh };
}
