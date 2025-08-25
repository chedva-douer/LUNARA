import React, { use, useEffect } from 'react';
import { Room } from '../../Models/Room.model';
import './RoomCard.scss';

interface RoomCardProps {
  room: Room;
  onOrder: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onOrder }) => {
  useEffect(() => { 
    console.log('RoomCard mounted with room:', room);
    if (!room) {
      console.error('Room data is missing');
    }
  }, [room]);
  return (
    <div className="room-card">
      <img
        src={`/${room.imageUrl}`}
        alt={`/${room.imageUrl}`}
        className="room-image"
      />
      <div className="room-details">
        <h2 className="room-title">חדר {room.roomNumber}</h2>
        <p><strong>סוג:</strong> {room.roomTypeDescription}</p>
        <p><strong>מחיר:</strong> ₪{room.roomPrice}</p>
        <p><strong>מבוגרים:</strong> {room.adultCount}</p>
        <p><strong>ילדים:</strong> {room.childCount}</p>
        <p><strong>מרפסת:</strong> {room.havePorch ? '✅' : '❌'}</p>
        <p><strong>ג׳קוזי:</strong> {room.haveJacuzzi ? '🛁' : '—'}</p>
        <button onClick={() => onOrder(room)} className="button">הזמן חדר</button>
      </div>
    </div>
  );
};

export default RoomCard;
