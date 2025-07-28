package com.example.hotel_project.dal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.hotel_project.model.User;
@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
    Optional<User> findByuserEmail(String email);
    boolean existsByUserEmail(String userEmail); 
    Optional<User> findById(int id);
    Optional<User> findByUserEmail(String email);
    @Query("SELECT u FROM User u")
    List<User> findAllUsers();
    
}