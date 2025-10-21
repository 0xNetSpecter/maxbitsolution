import { CinemasApi } from "@/api/cinemas";
import type { MovieSession } from "@/types/movies";
import type { Cinema } from "@/types/cinemas";

export class CinemasService {
  static async getAll(): Promise<Cinema[]> {
    const { data, error } = await CinemasApi.getAll();
    if (error.value) {
      console.error("Ошибка при загрузке кинотеатров:", error.value);
      throw new Error("Не удалось загрузить кинотеатры");
    }
    return data.value ?? [];
  }

  static async getSessions(cinemaId: number): Promise<
    (MovieSession & {
      startTimeDate: Date;
      startTimeHHMM: string;
      startDateDDMM: string;
    })[]
  > {
    const { data, error } = await CinemasApi.getSessions(cinemaId);
    if (error.value) {
      console.error(
        `Ошибка при загрузке сеансов cinema #${cinemaId}:`,
        error.value
      );
      throw new Error("Не удалось загрузить сеансы");
    }

    const sessions = data.value ?? [];
    return sessions.map((s) => {
      const d = new Date(s.startTime);
      return {
        ...s,
        startTimeDate: d,
        startTimeHHMM: d.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        startDateDDMM: d.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
        }),
      };
    });
  }
}
