package com.example.hotel_project.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.hotel_project.dto.EmailDataDTO;
import com.example.hotel_project.service.EmailService;

@RestController
@RequestMapping("/mail")
@CrossOrigin(origins = "http://localhost:3000")
public class MailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/sendSupport")
    public ResponseEntity<String> sendSupport(@RequestParam String userEmail, @RequestParam String messageText) {
        try {
            emailService.sendToSupport(userEmail, messageText);
            return ResponseEntity.ok("Support email sent successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/sendOK")
    public ResponseEntity<String> sendOK(@RequestBody EmailDataDTO emailDTO) {
        try {
            Map<String, String> vars = Map.of(
                    "userName", emailDTO.getUserName(),
                    "roomId", String.valueOf(emailDTO.getRoomId()),
                    "checkInDate", emailDTO.getCheckInDate(),
                    "checkOutDate", emailDTO.getCheckOutDate(),
                    "amount", String.format("%.2f", emailDTO.getAmount()));

            emailService.sendHtmlEmailWithTemplate(emailDTO.getRecipientEmail(), vars, "SendOK.html");
            return ResponseEntity.ok("Receipt email sent successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        }
    }

}
