export interface SeatCoord {
  rowNumber: number;
  seatNumber: number;
}

export interface SessionDetails {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  seats: {
    rows: number;
    seatsPerRow: number;
  };
  bookedSeats: SeatCoord[];
}
