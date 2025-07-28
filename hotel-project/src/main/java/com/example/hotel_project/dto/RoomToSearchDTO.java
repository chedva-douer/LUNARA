package com.example.hotel_project.dto;

import java.time.LocalDate;
import lombok.Data;
@Data
public class RoomToSearchDTO {
    private int numberOfAdults;
    private int numberOfChildren;
    private LocalDate checkInDate;
    private LocalDate checkOutDate; 
}


