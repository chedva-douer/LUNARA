package com.example.hotel_project.dto;
import lombok.Data;
@Data
public class RoomToAddDTO {
    private int roomId;
    private int roomTypeId;
    private String roomNumber;
    private String roomPrice;
    private int hotelId;
    private int adultCount;
    private int childCount;
    private boolean havePorch;
    private boolean haveJacuzzi;
    private String imageUrl;
}
