import { Room } from "./Room.model";

export interface Orser {
      roomId: Number,
      userId: Number,
      checkInDate: Date,
      checkOutDate: Date
      rooms?: Room[];
}