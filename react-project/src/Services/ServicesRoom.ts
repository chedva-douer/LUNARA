import axios from 'axios';
import { Room } from '../Models/Room.model';

const API_BASE = 'http://localhost:8080/rooms';

export const getAllRoomsByHotel = async (hotelId: number): Promise<Room[]> => {
  const response = await axios.get<Room[]>(`${API_BASE}/by-hotel/${hotelId}`);
  return response.data;
};