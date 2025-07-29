package com.example.hotel_project.controller;

import java.time.LocalDate;
import java.util.List;

// import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.hotel_project.dto.RoomToAddDTO;
import com.example.hotel_project.dto.RoomToShowDTO;
import com.example.hotel_project.mapper.RoomAddMapper;
import com.example.hotel_project.mapper.RoomMapper;
import com.example.hotel_project.model.Room;
import com.example.hotel_project.service.HotelService;
import com.example.hotel_project.service.RoomService;
import com.example.hotel_project.service.RoomTypeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService rService;
    @Autowired
    private HotelService hotelService;
    @Autowired
    private RoomTypeService roomTypeService;

    // @Autowired
    // private ModelMapper mapper;

    @GetMapping("/search")
    public ResponseEntity<?> searchSuitableRoom(
            @RequestParam int numberOfAdults,
            @RequestParam int numberOfChildren,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        try {
            List<Room> rooms = rService.getAvailableRooms(
                    numberOfAdults, numberOfChildren, checkInDate, checkOutDate);

            System.out.println("ROOMS: " + rooms.size());

            if (rooms.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No rooms found for the given criteria");
            }

            List<RoomToShowDTO> roomDTOs = rooms.stream()
                    .map(RoomMapper::toDTO)
                    .toList();

            return ResponseEntity.ok(roomDTOs);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/addRoom")
    public ResponseEntity<?> addRoom(@RequestBody RoomToAddDTO dto) {
        RoomAddMapper mapper = new RoomAddMapper(roomTypeService, hotelService);
        Room room = mapper.toEntity(dto);
        rService.addRoom(room,dto.getHotelId());
        return ResponseEntity.ok("Room added successfully");
    }

    @GetMapping("/by-hotel/{hotelId}")
    public List<RoomToShowDTO> getRoomsByHotelId(@PathVariable int hotelId) {
        List<Room> rooms = rService.findAllByHotelId(hotelId);
        if (rooms.isEmpty()) {
            throw new RuntimeException("No rooms found for the specified hotel ID");
        }
        List<RoomToShowDTO> roomDTOs = rooms.stream()
                .map(RoomMapper::toDTO)
                .toList();
        return roomDTOs;
    }

    @GetMapping("/{DateCheck}")
    public boolean isRoomAvailableInDate(int roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        return rService.DateCheck(roomId, checkInDate, checkOutDate);
    }

    @GetMapping("/getAllRooms")
    public ResponseEntity<List<Room>> getAllRooms() {
        try {
            List<Room> rooms = (List<Room>) rService.findAll();
            return ResponseEntity.ok(rooms);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
