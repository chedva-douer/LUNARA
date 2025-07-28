package com.example.hotel_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotel_project.dto.OrderDTO;
import com.example.hotel_project.model.Order;
import com.example.hotel_project.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @Autowired
    private OrderService oService;

    @PostMapping("/addOrder")
    public ResponseEntity<Order> addOrder(
            @RequestBody OrderDTO orderDto) {
        try {
            if (orderDto.getRoomId()==0|| orderDto.getCheckInDate() == null || orderDto.getCheckOutDate() == null
                    || orderDto.getUserId() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            Order o = oService.createOrder(orderDto.getRoomId(), orderDto.getCheckInDate(), orderDto.getCheckOutDate(),
                    orderDto.getUserId());
            return ResponseEntity.status(HttpStatus.CREATED).body(o);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
