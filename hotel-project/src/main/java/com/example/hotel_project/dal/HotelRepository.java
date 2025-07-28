package com.example.hotel_project.dal;

import com.example.hotel_project.model.Hotel;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface HotelRepository extends CrudRepository<Hotel, Integer> {
    boolean existsByHotelName(String hotelName);
    Optional<Hotel> findById(int id);

}
