package com.example.hotel_project.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import jakarta.mail.*;
import jakarta.mail.internet.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Map;
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

    public void sendHtmlEmailWithTemplate(String to, Map<String, String> vars, String templateName) {
        try {
            // 1. טען את תבנית ה-HTML
            ClassPathResource resource = new ClassPathResource("templates/" + templateName);
            String template = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

            for (Map.Entry<String, String> entry : vars.entrySet()) {
                template = template.replace("${" + entry.getKey() + "}", entry.getValue());
            }

            // 2. צור את קובץ ה-PDF (דוגמה: שימוש בפרמטרים מה־vars)
            String customerName = vars.getOrDefault("userName", "לקוח");
            String amount = vars.getOrDefault("amount", "0");
            String date = LocalDate.now().toString();
            System.out.println("PDF data: name=" + customerName + ", amount=" + amount + ", date=" + date);

            byte[] pdfData = PdfService.generateReceiptPdf(customerName, amount, date);

            // 3. צור הודעת מייל עם קובץ מצורף
            MimeMessage message = new MimeMessage(getSession());
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject("אישור הזמנה");

            Multipart multipart = new MimeMultipart();

            // גוף HTML
            MimeBodyPart htmlPart = new MimeBodyPart();
            htmlPart.setContent(template, "text/html; charset=utf-8");
            multipart.addBodyPart(htmlPart);

            // קובץ PDF מצורף
            MimeBodyPart attachmentPart = new MimeBodyPart();
            attachmentPart.setFileName("קבלה.pdf");
            attachmentPart.setContent(pdfData, "application/pdf");
            multipart.addBodyPart(attachmentPart);

            message.setContent(multipart);

            Transport.send(message);

        } catch (Exception e) {
            throw new RuntimeException("שגיאה בשליחת מייל עם PDF", e);
        }
    }

    private void sendEmail(String to, String subject, String body, String replyToEmail) {
        try {
            Message message = new MimeMessage(getSession());
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject);

            message.setContent(body, "text/html; charset=utf-8");

            if (replyToEmail != null && !replyToEmail.isBlank()) {
                message.setReplyTo(new Address[] { new InternetAddress(replyToEmail) });
            }

            Transport.send(message);

        } catch (MessagingException e) {
            System.err.println("שגיאה בשליחת מייל:");
            e.printStackTrace();
        }
    }

}
