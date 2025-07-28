package com.example.hotel_project.service;

import java.util.List;

import com.example.hotel_project.model.Hotel;

public interface HotelService {
    public void addHotel(Hotel hotel);
    public List<Hotel> getHotels();
    public Hotel getHotelById(int id);


    
}
