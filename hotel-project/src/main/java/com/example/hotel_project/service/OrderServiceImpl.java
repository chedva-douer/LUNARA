package com.example.hotel_project.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
// import java.util.List;
// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_project.dal.OrderRepository;
import com.example.hotel_project.dal.RoomRepository;
import com.example.hotel_project.dal.UserRepository;
import com.example.hotel_project.model.Order;
import com.example.hotel_project.model.Room;
import com.example.hotel_project.model.User;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository rep_order;
    @Autowired
    private UserRepository rep_user;
    @Autowired
    private RoomRepository rep_room;

@Override
public Order createOrder(int roomId, LocalDate checkInDate, LocalDate checkOutDate, int userId) {
    try {
        User user = rep_user.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = rep_room.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Order order = new Order();
        order.setCheckInDate(checkInDate);
        order.setCheckOutDate(checkOutDate);
        order.setUser(user);
        order.setRooms(Collections.singletonList(room));

        if (user.getOrders() == null) {
            user.setOrders(new ArrayList<>());
        }
        user.getOrders().add(order);

        return rep_order.save(order);

    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Error creating order: " + e.getMessage(), e);
    }
}

}
