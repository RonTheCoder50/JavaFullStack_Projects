package com.ron.backend.controller;

import com.ron.backend.dto.RequestLoginDto;
import com.ron.backend.dto.SignupReqDto;
import com.ron.backend.dto.UserDto;
import com.ron.backend.entity.UserHistory;
import com.ron.backend.entity.Users;
import com.ron.backend.repository.JobMatchRepository;
import com.ron.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    //Test - to start server as soon early
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(201).body("success");
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody RequestLoginDto dto) {
        return ResponseEntity.status(200).body(userService.login(dto));
    }

    //signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto dto) {
        return ResponseEntity.ok(userService.signup(dto));
    }

    //get user
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Users user = userService.getUser(id);
        return ResponseEntity.status(201).body(userService.convertDto(user));
    }

    //delete user
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removeUser(@PathVariable Long id) {
        return ResponseEntity.status(201).body(userService.deleteUser(id));
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserOverallInfo() {
        return userService.getUserData();
    }

    @GetMapping("/history")
    public ResponseEntity<?> getUserHistory(
         @RequestParam(defaultValue = "") String keyword,
         @RequestParam(defaultValue = "0") int page,
         @RequestParam(defaultValue = "10") int size,
         @RequestParam(defaultValue = "id") String sortBy,
         @RequestParam(defaultValue = "asc") String direction

    ) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        return ResponseEntity.ok(
                userService.getHistoryList(keyword, page, size, sort)
        );
    }
}
