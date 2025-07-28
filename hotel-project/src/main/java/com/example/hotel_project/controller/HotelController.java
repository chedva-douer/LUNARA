package com.example.hotel_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.modelmapper.ModelMapper;
import com.example.hotel_project.dto.HotelDTO;
import com.example.hotel_project.model.Hotel;
import com.example.hotel_project.service.HotelService;

@RestController
@RequestMapping("/hotels")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelController {
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private HotelService hotelService;

    @PostMapping("/addHotel")
    public ResponseEntity<String> addHotel(@RequestBody HotelDTO hotelDto) {
        try {
            Hotel hotel = mapper.map(hotelDto, Hotel.class);
            hotelService.addHotel(hotel);
            return ResponseEntity.status(HttpStatus.CREATED).body("Hotel added successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/getAllHotels")
    public ResponseEntity<List<HotelDTO>> getAllHotels() {
        try {
            List<Hotel> hotels = hotelService.getHotels();
            List<HotelDTO> hotelDtos = hotels.stream()
            .map(hotel -> mapper.map(hotel, HotelDTO.class))
            .toList();
            return ResponseEntity.ok(hotelDtos);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/getHotelById")
    public ResponseEntity<HotelDTO> getHotelById(@RequestParam int hotelId) {
        try {
            Hotel hotel = hotelService.getHotelById(hotelId);
            if (hotel == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            HotelDTO hotelDto = mapper.map(hotel, HotelDTO.class);
            return ResponseEntity.ok(hotelDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
