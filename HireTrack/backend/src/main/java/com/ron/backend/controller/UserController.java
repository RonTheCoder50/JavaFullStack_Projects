package com.ron.backend.controller;

import com.ron.backend.dto.RequestLoginDto;
import com.ron.backend.dto.UserDto;
import com.ron.backend.entity.Users;
import com.ron.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RequestLoginDto user) {
        return ResponseEntity.status(200).body(userService.login(user));
    }

    //signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Users user) {
        return userService.signup(user);
    }

    //get user
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        Users user = userService.getUser(id);
        return ResponseEntity.status(201).body(userService.convertDto(user));
    }

    //delete user
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removeUser(@PathVariable Long id) {
        return ResponseEntity.status(201).body(userService.deleteUser(id));
    }

}
