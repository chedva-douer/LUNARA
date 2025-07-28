package com.example.hotel_project.model;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue
    private int orderId;
    @Column
    private LocalDate checkInDate;
    @Column
    private LocalDate checkOutDate;
    @ManyToMany(mappedBy = "orders")
    private List<Room> rooms;
    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonManagedReference
    @JsonIgnore
    private User user;
}
