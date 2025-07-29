package com.example.hotel_project.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

public class PdfService {

    public static byte[] generateReceiptPdf(String customerName, String amount, String date) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // טעינת גופן עברי
            BaseFont baseFont = BaseFont.createFont("fonts/Rubik-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font font = new Font(baseFont, 12, Font.NORMAL);
            Font fontTitle = new Font(baseFont, 18, Font.BOLD);

            // טבלה קטנה עם שם הלקוח (כחלופה ל-Paragraph עם RTL)
            PdfPTable nameTable = new PdfPTable(1);
            nameTable.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
            nameTable.setWidthPercentage(100);
            PdfPCell nameCell = new PdfPCell(new Phrase("שם לקוח: " + customerName, font));
            nameCell.setBorder(Rectangle.NO_BORDER);
            nameCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            nameTable.addCell(nameCell);
            document.add(nameTable);

            // לוגו
            InputStream logoStream = PdfService.class.getResourceAsStream("/static/logo.png");
            if (logoStream != null) {
                byte[] logoBytes = logoStream.readAllBytes();
                Image logo = Image.getInstance(logoBytes);
                logo.scaleToFit(120, 80);
                logo.setAlignment(Image.ALIGN_CENTER);
                document.add(logo);
            }

            // כותרת
            PdfPTable titleTable = new PdfPTable(1);
            titleTable.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
            titleTable.setWidthPercentage(100);

            PdfPCell titleCell = new PdfPCell(new Phrase("קבלה על רכישה", fontTitle));
            titleCell.setBorder(Rectangle.NO_BORDER);
            titleCell.setHorizontalAlignment(Element.ALIGN_CENTER);

            titleTable.addCell(titleCell);
            document.add(titleTable);

            document.add(new Paragraph(" ")); // רווח

            // טבלת פרטי רכישה
            PdfPTable table = new PdfPTable(2);
            table.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);

            table.addCell(getCell("סכום:", PdfPCell.ALIGN_RIGHT, font));
            table.addCell(getCell(amount + " ₪", PdfPCell.ALIGN_LEFT, font));

            table.addCell(getCell("תאריך:", PdfPCell.ALIGN_RIGHT, font));
            table.addCell(getCell(date, PdfPCell.ALIGN_LEFT, font));

            document.add(table);

            // טקסט תודה בתוך טבלה
            PdfPTable thanksTable = new PdfPTable(1);
            thanksTable.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
            thanksTable.setWidthPercentage(100);
            PdfPCell thanksCell = new PdfPCell(new Phrase("!תודה על רכישתך", font));
            thanksCell.setBorder(Rectangle.NO_BORDER);
            thanksCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            thanksTable.addCell(thanksCell);
            document.add(thanksTable);

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return outputStream.toByteArray();
    }

    private static PdfPCell getCell(String text, int alignment, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setPadding(8);
        cell.setHorizontalAlignment(alignment);
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
        return cell;
    }
}