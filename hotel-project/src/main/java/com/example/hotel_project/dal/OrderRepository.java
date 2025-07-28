package com.example.hotel_project.dal;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.hotel_project.model.Order;
@Repository

public interface OrderRepository extends CrudRepository<Order,Integer> {
    List<Order> findByRooms_RoomId(int roomId);
}

