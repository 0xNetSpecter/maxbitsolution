import { useApiFetch } from "@/composables/useApiFetch";
import type { BookingPaymentResponse } from "@/types/bookings";

export const BookingsApi = {
  pay(bookingId: string) {
    const token = localStorage.getItem("auth_token");

    return useApiFetch<BookingPaymentResponse>(
      `/bookings/${bookingId}/payments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
