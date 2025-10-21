import { useApiFetch } from "@/composables/useApiFetch";
import type { SessionDetails, SeatCoord } from "@/types/sessions";
import type { BookingCreatedResponse } from "@/types/bookings";

export const SessionsApi = {
  getDetails(movieSessionId: number) {
    return useApiFetch<SessionDetails>(`/movieSessions/${movieSessionId}`, {
      default: () => ({
        id: 0,
        movieId: 0,
        cinemaId: 0,
        startTime: new Date(0).toISOString(),
        seats: { rows: 0, seatsPerRow: 0 },
        bookedSeats: [],
      }),
    });
  },

  bookSeats(movieSessionId: number, seats: SeatCoord[]) {
    return useApiFetch<BookingCreatedResponse, { seats: SeatCoord[] }>(
      `/movieSessions/${movieSessionId}/bookings`,
      {
        method: "post",
        body: { seats },
      }
    );
  },
};
