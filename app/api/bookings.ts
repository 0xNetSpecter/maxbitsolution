import { useApiFetch } from "@/composables/useApiFetch";
import type { BookingPaymentResponse } from "@/types/bookings";

export const BookingsApi = {
  pay(bookingId: string) {
    return useApiFetch<BookingPaymentResponse>(
      `/bookings/${bookingId}/payments`,
      {
        method: "post",
      }
    );
  },
};
