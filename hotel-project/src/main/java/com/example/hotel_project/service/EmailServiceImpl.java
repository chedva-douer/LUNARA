package com.example.hotel_project.service;

import org.springframework.stereotype.Service;
import jakarta.mail.*;
import jakarta.mail.internet.*;
import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {

    // הגדרות SMTP
    private static final String SMTP_HOST = "smtp.gmail.com";
    private static final String USERNAME = "ch0583271192@gmail.com";
    private static final String PASSWORD = "xhoz dgxh zbke xztx";
    private static final String SUPPORT_EMAIL = "ch0583271192@gmail.com";

    // יצירת סשן מאובטח לשליחת מיילים
    private static Session getSession() {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.port", "587");

        return Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });
    }

    public void sendToSupport(String userEmail, String messageText) {
        String subject = "פניית תמיכה";
        sendEmail(SUPPORT_EMAIL, subject, messageText, userEmail);
    }

    public void sendReceipt(String recipientEmail, String messageText) {
        String subject = "קבלה על רכישה";
        sendEmail(recipientEmail, subject, messageText, null);
    }

    private void sendEmail(String to, String subject, String body, String replyToEmail) {
        try {
            Message message = new MimeMessage(getSession());
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject);

            // שליחה בפורמט HTML
            message.setContent(body, "text/html; charset=utf-8");

            // אם הוגדרה כתובת להשבה – הוסף כ־Reply-To
            if (replyToEmail != null && !replyToEmail.isBlank()) {
                message.setReplyTo(new Address[]{ new InternetAddress(replyToEmail) });
            }

            Transport.send(message);

            System.out.println("========== מייל נשלח ==========");
            System.out.println("אל: " + to);
            System.out.println("נושא: " + subject);
            if (replyToEmail != null) System.out.println("Reply-To: " + replyToEmail);
            System.out.println("תוכן (HTML): " + body);
            System.out.println("================================");

        } catch (MessagingException e) {
            System.err.println("שגיאה בשליחת מייל:");
            e.printStackTrace();
        }
    }


}
