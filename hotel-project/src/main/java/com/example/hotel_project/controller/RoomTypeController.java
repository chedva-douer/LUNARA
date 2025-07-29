package com.example.hotel_project.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotel_project.dto.RoomTypeDTO;
import com.example.hotel_project.model.RoomType;
import com.example.hotel_project.service.RoomTypeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/roomtype")
public class RoomTypeController {
    @Autowired
    private RoomTypeService roomTypeService;
    @Autowired
    private ModelMapper mapper;

    @PostMapping("/addRoomType")
    public ResponseEntity<String> addRoomType(@RequestBody RoomTypeDTO request) {
        if (request.getDescription() == null || request.getDescription().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Description cannot be empty");
        }

        RoomType roomType = mapper.map(request, RoomType.class);
        roomTypeService.addRoomType(roomType);
        return ResponseEntity.status(HttpStatus.CREATED).body("Room type added successfully");
    }

    @GetMapping("/getRoomType")
    public ResponseEntity<List<RoomType>> getRoomType() {
        List<RoomType> roomTypes = roomTypeService.findAllRoomTypes();
        if (roomTypes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(roomTypes);
    }
}
