package com.example.hotel_project.dal;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.hotel_project.model.RoomType;

@Repository

public interface RoomTypeRepository extends CrudRepository<RoomType, Integer> {

 String findDescriptionBytypeId(int id);
 List<RoomType> findAll();
 RoomType findByTypeId(int typeId);

}