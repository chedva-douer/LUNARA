package com.example.hotel_project.service;

import java.util.List;

import com.example.hotel_project.model.RoomType;

public interface RoomTypeService {

    public String getDescriptionByTypeId(int id);
    void addRoomType(RoomType roomType);
    List<RoomType> findAllRoomTypes();
    RoomType findById(int typeId);
} 
