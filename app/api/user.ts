import { useApiFetch } from "@/composables/useApiFetch";
import type { MyBooking } from "@/types/me";

export const MeApi = {
  getBookings() {
    return useApiFetch<MyBooking[]>("/me/bookings", { default: () => [] });
  },
};
