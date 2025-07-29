package com.example.hotel_project.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Table
@Data
public class Room {
    @Id
    @GeneratedValue
    private int roomId;

    @ManyToOne
    @JoinColumn(name = "roomType", referencedColumnName = "typeId")
    @JsonBackReference
    private RoomType roomType;

    @Column
    private String roomNumber;

    @Column
    private String roomPrice;

    @ManyToOne
    @JoinColumn(name = "hotelId")
    @JsonBackReference
    private Hotel hotel;

    @Column
    private int adultCount;

    @Column
    private int childCount;

    @Column
    private boolean havePorch;

    @Column
    private boolean haveJacuzzi;
    @Column
    private String imageUrl;

    @ManyToMany
    @JoinTable(name = "room_order", joinColumns = @JoinColumn(name = "room_id"), inverseJoinColumns = @JoinColumn(name = "order_id"))
    private List<Order> orders;
}
