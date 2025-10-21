import { defineStore } from "pinia";
import type { Movie } from "@/types/movies";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: [] as Movie[],
    lastSelected: null as Movie | null,
  }),

  actions: {
    setMovies(list: Movie[]) {
      this.movies = list;
    },
    setLast(movie: Movie) {
      this.lastSelected = movie;
    },
    addMovie(movie: Movie) {
      if (!this.movies.find((m) => m.id === movie.id)) {
        this.movies.push(movie);
      }
    },
  },
});
