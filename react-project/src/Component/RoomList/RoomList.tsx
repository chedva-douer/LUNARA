import React, { useEffect, useState } from 'react';
import { Room } from '../../Models/Room.model';
import RoomCard from '../RoomCard/RoomCard';
import { getAllRoomsByHotel } from '../../Services/ServicesRoom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Props {
  hotelId?: number;
  roomsList?: Room[];
  checkInDate?: Date | null;
  checkOutDate?: Date | null;
  onRoomClick?: (room: Room) => void; 
}


const RoomList: React.FC<Props> = ({ hotelId, roomsList,checkInDate,checkOutDate, onRoomClick }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>(roomsList || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    console.log(roomsList)
    if (roomsList) {
      setRooms(roomsList);
      setLoading(false);
    }
  }, [roomsList]);

  useEffect(() => {
    if (!hotelId || roomsList) return;

    const fetchRooms = async () => {
      try {
        const data = await getAllRoomsByHotel(hotelId);
        setRooms(data);
        setLoading(false);
      } catch (err) {
        setError('אירעה שגיאה בשליפת החדרים');
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId, roomsList]);

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (redirectToLogin) {
      navigate('/login');
    }
  }, [redirectToLogin, navigate]);
  const handleOrder = (room: Room) => {
    if (!user) {
      toast.error('משתמש לא מחובר');
      setRedirectToLogin(true);
      return;
    }
    if (!checkInDate || !checkOutDate) {
      toast.error('יש לבחור תאריכים');
      return;
    }
    navigate('/payment', {
      state: {
        roomId: room.roomNumber ?? null,
        userId: user.id,
        checkInDate,
        checkOutDate,
        amount: (Number(room.roomPrice) * ((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)+1)),
      }
    });
  };

  if (loading) return <p>טוען חדרים...</p>;
  if (error) return <p>{error}</p>;
  if (rooms.length === 0) return <p>לא נמצאו חדרים להצגה.</p>;

  return (
    <div className="room-list-container">
      {Array.isArray(rooms) && rooms.map((room) => (
        <RoomCard
          key={room.roomNumber}
          room={room}
          onOrder={onRoomClick ? () => onRoomClick(room) : handleOrder}
        />
      ))}
    </div>
  );
};

export default RoomList;
