package com.example.hotel_project.service;
import java.time.LocalDate;
import java.util.List;
import com.example.hotel_project.model.Room;

public interface RoomService {
    public  List<Room> getAvailableRooms(int adultCount, int childCount, LocalDate checkInDate, LocalDate checkOutDate);

    public void addRoom(Room room, int hotelId);

    public List<Room> matchRooms(int adultCount, int childCount, LocalDate checkInDate, LocalDate checkOutDate);

    public boolean DateCheck(int roomId, LocalDate checkInDate, LocalDate checkOutDate);

    public List<Room> findAllByHotelId(int hotelId);
    
    public List<Room> findAll();
    public void deleteRoom(int roomId);
    public void changeImageUrl(int roomId,String imageUrl);
}
