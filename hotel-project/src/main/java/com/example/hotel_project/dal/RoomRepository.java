package com.example.hotel_project.dal;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.hotel_project.model.Room;

@Repository

public interface RoomRepository extends CrudRepository<Room, Integer> {
  boolean existsByRoomId(int roomId);

  List<Room> findAllByHotelId(int hotelId);

  @Query("SELECT r FROM Room r WHERE r.roomId IN :ids")

  List<Room> findAllRoomsById(int id);

  List<Room> findAllByRoomNumber(String id);

  boolean existsByRoomNumber(String roomId);

}