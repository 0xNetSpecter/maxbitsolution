import type { SeatCoord } from "./sessions";

export interface MyBooking {
  id: string;
  userId: number;
  movieSessionId: number;
  sessionId: number;
  bookedAt: string;
  seats: SeatCoord[];
  isPaid: boolean;
}
