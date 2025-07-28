package com.example.hotel_project.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Table
@Data
public class RoomType {
    @Id
    @GeneratedValue
    private int typeId;

    @Column
    private String description;

    @OneToMany(mappedBy = "roomType")  // חייב להתאים לשם השדה במחלקת Room
    @JsonManagedReference
    private List<Room> rooms; 
}

