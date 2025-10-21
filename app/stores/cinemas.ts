import { defineStore } from "pinia";
import { CinemasService } from "@/services/cinemas.service";
import type { Cinema } from "@/types/cinemas";

export const useCinemasStore = defineStore("cinemas", {
  state: () => ({
    list: [] as Cinema[],
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    getNameById: (state) => (id: number) => {
      const cinema = state.list.find((c) => c.id === id);
      return cinema?.name || "Неизвестный кинотеатр";
    },
  },

  actions: {
    async fetchAll(force = false) {
      if (this.list.length && !force) return;
      this.loading = true;
      this.error = null;
      try {
        this.list = await CinemasService.getAll();
      } catch (e: any) {
        this.error = e.message || "Ошибка загрузки кинотеатров";
      } finally {
        this.loading = false;
      }
    },
  },
});
