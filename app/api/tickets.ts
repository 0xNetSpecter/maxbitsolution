import { useApiFetch } from "@/composables/useApiFetch";
import type { MyBooking } from "@/types/me";

export const TicketsApi = {
  getBookings(force = false) {
    return useApiFetch<MyBooking[]>("/me/bookings", {
      default: () => [],
      immediate: true,
      key: force ? `bookings-${Date.now()}` : "bookings",
    });
  },
};
