package com.example.hotel_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_project.dal.UserRepository;
import com.example.hotel_project.model.User;

@Service

public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository rep;

    @Override
    public User addUser(User u) {
        if (rep.existsByUserEmail(u.getUserEmail())) {
            throw new RuntimeException(
                    "Cannot add user with the email " + u.getUserEmail() + " because it already exists.");
        }
        rep.save(u);
        return rep.findByuserEmail(u.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User with email " + u.getUserEmail() + " not found."));
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return rep.findByuserEmail(email);
    }

    @Override
    public User login(String email, String password) {
        Optional<User> userOpt = rep.findByuserEmail(email);
        if (userOpt.isEmpty()) {
            return null;
        }
        User user = userOpt.get();
        return user;
    }

    @Override
    public List<User> getAll() {
        return rep.findAllUsers();
    }

    @Override
    public User updateUser(String name, String email, String password, String phone) {
        Optional<User> userOpt = rep.findByuserEmail(email);
        if (userOpt.isEmpty()) {
            return null;
        }
        User user = userOpt.get();
        user.setUserName(name);
        user.setUserEmail(email);
        user.setPassword(password);
        user.setUserPhone(phone);
        rep.save(user);
        Optional<User> user2 = rep.findByuserEmail(email);
        return user2.orElse(null);
    }

    @Override

    public User getByEmail(String email) {
        return rep.findByUserEmail(email).orElse(null);
    }
}
