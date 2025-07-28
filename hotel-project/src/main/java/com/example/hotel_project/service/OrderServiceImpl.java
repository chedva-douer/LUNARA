package com.example.hotel_project.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Order order = new Order();

        try {
            Optional<User> userOptional = rep_user.findById(userId);
            if (userOptional.isEmpty()) {
                throw new RuntimeException("User not found");
            }
            User user = userOptional.get();

            List<Room> rooms = rep_room.findAllRoomsById(roomId);
            if (rooms == null || rooms.isEmpty()) {
                throw new RuntimeException("Room not found");
            }

            order.setCheckInDate(checkInDate);
            order.setCheckOutDate(checkOutDate);
            order.setUser(user);

            // קישור ההזמנה לחדר
            for (Room room : rooms) {
                if (room.getOrders() == null) {
                    room.setOrders(new ArrayList<>());
                }
                room.getOrders().add(order);
            }

            // קביעת החדרים בהזמנה
            order.setRooms(rooms);

            // הוספת ההזמנה למשתמש
            if (user.getOrders() == null) {
                user.setOrders(new ArrayList<>());
            }
            user.getOrders().add(order);

            // שמירת ההזמנה במסד הנתונים
            rep_order.save(order);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating order: " + e.getMessage(), e);
        }
        return order;
    }

}
