import { $fetch } from "ofetch";
import { useCinemasStore } from "@/stores/cinemas";

export const useMovieDetails = async (movieId: number) => {
  const cinemasStore = useCinemasStore();
  await cinemasStore.fetchAll();

  const sessions = await $fetch(`/api/movies/${movieId}/sessions`);

  const validSessions = computed(() => {
    const now = new Date();
    return sessions.filter((s) => {
      const start = new Date(s.startTime);
      return start.getTime() - now.getTime() > -15 * 60 * 1000;
    });
  });

  const grouped = computed(() => {
    const map: Record<string, Record<string, any[]>> = {};
    validSessions.value.forEach((s) => {
      const d = new Date(s.startTime);
      const date = d.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
      });
      const time = d.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const cinemaName = cinemasStore.getNameById(s.cinemaId) || "Неизвестно";
      map[date] ||= {};
      (map[date][cinemaName] ||= []).push({ ...s, startTime: time });
    });
    return map;
  });

  return { sessions, grouped };
};
