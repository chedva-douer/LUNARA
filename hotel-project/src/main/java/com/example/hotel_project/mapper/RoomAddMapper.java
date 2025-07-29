package com.example.hotel_project.mapper;
import com.example.hotel_project.dto.RoomToAddDTO;
import com.example.hotel_project.model.Room;
import com.example.hotel_project.model.RoomType;
import com.example.hotel_project.model.Hotel;
import com.example.hotel_project.service.RoomTypeService;
import com.example.hotel_project.service.HotelService;
public class RoomAddMapper {




    private final RoomTypeService roomTypeService;
    private final HotelService hotelService;

    public RoomAddMapper(RoomTypeService roomTypeService, HotelService hotelService) {
        this.roomTypeService = roomTypeService;
        this.hotelService = hotelService;
    }

    public Room toEntity(RoomToAddDTO dto) {
        Room room = new Room();
        room.setRoomId(dto.getRoomId());
        room.setRoomNumber(dto.getRoomNumber());
        room.setRoomPrice(dto.getRoomPrice());
        room.setAdultCount(dto.getAdultCount());
        room.setChildCount(dto.getChildCount());
        room.setHavePorch(dto.isHavePorch());
        room.setHaveJacuzzi(dto.isHaveJacuzzi());
        room.setImageUrl(dto.getImageUrl());

        // שליפת ישויות לפי מזהים
        RoomType roomType = roomTypeService.findById(dto.getRoomTypeId());
        Hotel hotel = hotelService.findById(dto.getHotelId());

        room.setRoomType(roomType);
        room.setHotel(hotel);

        return room;
    }
}
 
