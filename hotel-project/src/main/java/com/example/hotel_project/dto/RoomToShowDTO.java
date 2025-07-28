package com.example.hotel_project.dto;
import lombok.Data;
@Data
public class RoomToShowDTO {
    private int roomTyp; 
    private String roomNumber;
    private String roomPrice;
    private String hotelName; 
    private int adultCount;
    private int childCount;
    private boolean havePorch;
    private boolean haveJacuzzi;
    private String imageUrl;
}

