export interface Room {
  roomId: number;
  roomTyp: string;
  roomTypy?: {
    typeName: string;
  };
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
