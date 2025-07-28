package com.example.hotel_project.service;

public interface EmailService {

    void sendToSupport(String userEmail,String messageText);
    void sendReceipt(String recipientEmail, String messageText);
}

