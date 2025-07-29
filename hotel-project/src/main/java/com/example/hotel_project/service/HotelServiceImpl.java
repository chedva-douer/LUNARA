package com.example.hotel_project.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.hotel_project.dal.HotelRepository;
import com.example.hotel_project.model.Hotel;

@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository rep_hotel;

    @Override
    public void addHotel(Hotel hotel) {
        if (hotel.getHotelName() == null || hotel.getHotelName().trim().isEmpty()) {
            throw new RuntimeException("Hotel name cannot be null or empty.");
        }
        if (rep_hotel.existsByHotelName(hotel.getHotelName())) {
            throw new RuntimeException("Hotel with name " + hotel.getHotelName() + " already exists.");
        }
        rep_hotel.save(hotel);
    }

    @Override
    public List<Hotel> getHotels() {
    Iterable<Hotel> hotels = rep_hotel.findAll();
    return StreamSupport.stream(hotels.spliterator(), false)
                        .collect(Collectors.toList());    }

    @Override
    public Hotel getHotelById(int id) {
        return rep_hotel.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel with id " + id + " not found."));
    }

    @Override
    public Hotel findById(int id) {
        return rep_hotel.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel with id " + id + " not found."));    
    }

}
