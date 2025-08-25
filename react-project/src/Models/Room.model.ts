export interface Room {
  roomId: number;
  roomTypeDescription: string;

  roomNumber: string;
  roomPrice: string;
  adultCount: number;
  childCount: number;
  havePorch: boolean;
  haveJacuzzi: boolean;
  imageUrl: string; 
  hotel?: {
    name: string;
  };
  order?: {
    orderId: number;
  } | null;
}
