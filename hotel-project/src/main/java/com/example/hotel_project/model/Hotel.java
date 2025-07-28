package com.example.hotel_project.model;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.Data;
@Entity
@Table
@Data
public class Hotel {
    @Id
    @GeneratedValue
    private int Id;
    @Column
    private String hotelName;
    @Column
    private String hotelAddress;
    @Column
    private String hotelCity;
    @Column
    private String hotelPhone;
    @Column
    private String hotelEmail;  
    @OneToMany(mappedBy = "hotel")
    private List<Room> rooms; 
    @Column
    private List<String> imagesUrl;

}
