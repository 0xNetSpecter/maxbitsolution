import { defineStore } from "pinia";
import { CinemasApi } from "@/api/cinemas";
import type { Cinema } from "@/types/cinemas";

export const useCinemasStore = defineStore("cinemas", {
  state: () => ({
    list: [] as Cinema[],
    isLoaded: false,
  }),

  actions: {
    async fetchAll() {
      if (this.isLoaded) return;
      const { data, error } = await CinemasApi.getAll();
      if (!error.value && data.value) {
        this.list = data.value;
        this.isLoaded = true;
      }
    },

    getNameById(id: number) {
      return this.list.find((c) => c.id === id)?.name || `Кинотеатр #${id}`;
    },
  },
});
