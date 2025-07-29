package com.example.hotel_project.mapper;

import com.example.hotel_project.dto.RoomToShowDTO;
import com.example.hotel_project.model.Room;

public class RoomMapper {
    public static RoomToShowDTO toDTO(Room room) {
        RoomToShowDTO dto = new RoomToShowDTO();
        dto.setRoomId(room.getRoomId());
        dto.setRoomNumber(room.getRoomNumber());
        dto.setRoomPrice(room.getRoomPrice());
        dto.setHotelName(room.getHotel() != null ? room.getHotel().getHotelName() : null);
        dto.setAdultCount(room.getAdultCount());
        dto.setChildCount(room.getChildCount());
        dto.setHavePorch(room.isHavePorch());
        dto.setHaveJacuzzi(room.isHaveJacuzzi());
        dto.setImageUrl(room.getImageUrl());
        dto.setRoomTypeDescription(room.getRoomType() != null ? room.getRoomType().getDescription() : null);
        return dto;
    }
}
