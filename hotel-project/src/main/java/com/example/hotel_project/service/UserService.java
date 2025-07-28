package com.example.hotel_project.service;
import java.util.List;
import java.util.Optional;

import com.example.hotel_project.model.User;
public interface UserService {
    public User addUser(User u);
    public Optional<User> findUserByEmail(String email);
    public User login(String email, String password);
    public List<User> getAll();
    public User updateUser( String name, String email, String password, String phone);
    User getByEmail(String email);
}
