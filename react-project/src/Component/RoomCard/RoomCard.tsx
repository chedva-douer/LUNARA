import React from 'react';
import { Room } from '../../Models/Room.model';
import './RoomCard.scss';

interface RoomCardProps {
  room: Room;
  onOrder: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onOrder }) => {
  return (
    <div className="room-card">
      <img
        src={`/תמונות/image${room.roomId}.jpg`}
        alt="Room"
        className="room-image"
      />
      <div className="room-details">
        <h2 className="room-title">חדר {room.roomNumber}</h2>
        <p><strong>סוג:</strong> {room.RoomTypeDescription}</p>
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
