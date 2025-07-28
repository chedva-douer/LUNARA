package com.example.hotel_project.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_project.dal.HotelRepository;
import com.example.hotel_project.dal.OrderRepository;
import com.example.hotel_project.dal.RoomRepository;
import com.example.hotel_project.model.Hotel;
import com.example.hotel_project.model.Order;
import com.example.hotel_project.model.Room;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository rep_room;
    @Autowired
    private OrderRepository rep_Order;
    @Autowired
    private HotelRepository rep_Hotel;

    @Override
    public synchronized List<Room> getAvailableRooms(int adultCount, int childCount, LocalDate checkInDate,
            LocalDate checkOutDate) {
        List<Room> rooms = (List<Room>) rep_room.findAll();
        List<Room> availableRooms = new ArrayList<>();

        for (Room room : rooms) {
            // בדיקה אם החדר מספיק גדול
            if (room.getAdultCount() >= adultCount && room.getChildCount() >= childCount) {
                List<Order> orders = rep_Order.findByRooms_RoomId(room.getRoomId());
                boolean isAvailable = true;

                for (Order order : orders) {
                    // בדיקת חפיפת תאריכים
                    if (!(checkOutDate.isBefore(order.getCheckInDate())
                            || checkInDate.isAfter(order.getCheckOutDate()))) {
                        isAvailable = false;
                        break;
                    }
                }

                if (isAvailable) {
                    availableRooms.add(room);
                }
            }
        }

        availableRooms.sort(Comparator.comparing(Room::getAdultCount).thenComparing(Room::getChildCount));

        return availableRooms;
    }

    @Override
    public void addRoom(Room room, int hotelId) {
        if (rep_room.existsById(room.getRoomId())) {
            throw new RuntimeException(
                    "Cannot add room with the Number " + room.getRoomId() + " because it already exists.");
        }

        Hotel hotel = rep_Hotel.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found with ID " + hotelId));

        room.setHotel(hotel);

        rep_room.save(room);
    }

    @Override
    public List<Room> matchRooms(int adultCount, int childCount, LocalDate checkInDate, LocalDate checkOutDate) {
        throw new UnsupportedOperationException("Unimplemented method 'matchRooms'");
    }

    @Override
    public boolean DateCheck(int roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Order> orders = (List<Order>) rep_Order.findByRooms_RoomId(roomId);
        for (Order order : orders) {
            if (!(checkOutDate.isBefore(order.getCheckInDate())
                    || checkInDate.isAfter(order.getCheckOutDate()))) {
                return false;
            }
        }
        return true;
    }

    @Override
    public List<Room> findAllByHotelId(int hotelId) {
        return rep_room.findAllByHotelId(hotelId);
    }

    @Override
    public List<Room> findAll() {
        return (List<Room>) rep_room.findAll();
    }

    @Override
    public void deleteRoom(int roomId) {
        Room room = rep_room.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room with ID " + roomId + " not found."));
        rep_room.delete(room);
    }

    @Override
    public void changeImageUrl(int roomId, String imageUrl) {
        Room room = rep_room.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room with ID " + roomId + " not found."));
        room.setImageUrl(imageUrl);
        rep_room.save(room);
    }

}
