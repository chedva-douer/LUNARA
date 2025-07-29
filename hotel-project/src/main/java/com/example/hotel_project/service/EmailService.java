package com.example.hotel_project.service;

import java.util.Map;

public interface EmailService {
    void sendHtmlEmailWithTemplate(String to, Map<String, String> vars, String templateName);
    void sendToSupport(String userEmail,String messageText);
    void sendReceipt(String recipientEmail, String messageText);
}

