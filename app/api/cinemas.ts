import { useApiFetch } from "@/composables/useApiFetch";
import type { Cinema } from "@/types/cinemas";
import type { MovieSession } from "@/types/movies";

export const CinemasApi = {
  getAll() {
    return useApiFetch<Cinema[]>("/cinemas", { default: () => [] });
  },

  getSessions(cinemaId: number) {
    return useApiFetch<MovieSession[]>(`/cinemas/${cinemaId}/sessions`, {
      default: () => [],
    });
  },
};
