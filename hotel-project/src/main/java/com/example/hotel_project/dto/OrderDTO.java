package com.example.hotel_project.dto;

import java.time.LocalDate;
import lombok.Data;
@Data
public class OrderDTO {
    private int roomId;
    private int userId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
}