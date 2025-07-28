package com.example.hotel_project.service;
import java.time.LocalDate;

import com.example.hotel_project.model.Order;

public interface OrderService {
    
    public Order createOrder(int roomId, LocalDate checkInDate, LocalDate checkOutDate,int userId);
}
