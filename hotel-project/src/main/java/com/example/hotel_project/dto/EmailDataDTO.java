package com.example.hotel_project.dto;

import lombok.Data;

@Data
public class EmailDataDTO {
    private String recipientEmail;
    private String userName;
    private Number roomId;
    private String checkInDate;
    private String checkOutDate;
    private double amount;
}
