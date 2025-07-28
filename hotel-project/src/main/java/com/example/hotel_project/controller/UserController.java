package com.example.hotel_project.controller;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotel_project.dto.GoogleUserDTO;
import com.example.hotel_project.dto.UserToAddDTO;
import com.example.hotel_project.dto.UserToLogintDTO;
import com.example.hotel_project.model.User;
import com.example.hotel_project.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserToLogintDTO request) {
        User user = userService.login(request.getEmail(), request.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            return ResponseEntity.ok(userService.getAll());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(
            @RequestBody UserToAddDTO userDto) {
        User newUser = mapper.map(userDto, User.class);
        try {
            userService.addUser(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @PostMapping("/UpdateUser")
    public ResponseEntity<User> updateUser(@RequestBody UserToAddDTO request) {
        User updatedUser = userService.updateUser(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getPhone());

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

@PostMapping("/google-login")
public ResponseEntity<User> googleLogin(@RequestBody GoogleUserDTO googleUser) {
    if (googleUser.getEmail() == null) {
        return ResponseEntity.badRequest().build();
    }

    // חיפוש לפי אימייל
    User existingUser = userService.getByEmail(googleUser.getEmail());
    if (existingUser != null) {
        return ResponseEntity.ok(existingUser);
    }

    // יצירת משתמש חדש אם לא קיים
    User newUser = new User();
    newUser.setUserEmail(googleUser.getEmail());
    newUser.setUserName(googleUser.getUserName());
    newUser.setPassword(""); // או null
    newUser.setUserPhone("");

    userService.addUser(newUser);
    return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
}


}
