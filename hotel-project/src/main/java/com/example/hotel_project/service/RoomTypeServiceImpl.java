package com.example.hotel_project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_project.dal.RoomTypeRepository;
import com.example.hotel_project.model.RoomType;

@Service

public class RoomTypeServiceImpl implements RoomTypeService {
    @Autowired
    private RoomTypeRepository rep_room;

    @Override
    public String getDescriptionByTypeId(int id) {
        return rep_room.findDescriptionBytypeId(id);
    }

    @Override
    public void addRoomType(RoomType roomType) {
        try {
            rep_room.save(roomType);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error adding room type: " + e.getMessage(), e);
        }
    }

    @Override
    public List<RoomType> findAllRoomTypes() {
        return (List<RoomType>) rep_room.findAll();
    }

    @Override
    public RoomType findById(int typeId) {
       return rep_room.findByTypeId(typeId);
    }

}
