package com.example.hotel_project.dto;
import lombok.Data;

@Data
public class HotelDTO {
    private int id;
    private String hotelName;
    private String hotelAddress;
    private String hotelCity;
    private String hotelPhone;
    private String hotelEmail;
    private String[] imagesUrl; 
}
