package com.ron.backend_blog2.controller;

import com.ron.backend_blog2.dto.UserResponseDto;
import com.ron.backend_blog2.entity.Users;
import com.ron.backend_blog2.enums.Role;
import com.ron.backend_blog2.service.JwtService;
import com.ron.backend_blog2.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/auth")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody Users user) throws RuntimeException {
        Users us = userService.userRegister(user);
        if(us == null) {
            throw new RuntimeException("failed to register the user");
        }

        return ResponseEntity.status(200).body(
                new UserResponseDto(
                        us.getId(),
                        us.getUsername(),
                        us.getEmail(),
                        us.getPosts(),
                        us.getBookmarks(),
                        us.getRole(),
                        us.getJoinDate()
                )
        );
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user, HttpServletRequest request) {
        Users us = userService.userLogin(user, request);
        if(us == null) {
            return "bad404";
        }

        return jwtService.generateToken(us.getEmail());
    }

    //get all users
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.status(200).body(userService.getAllUsers());
    }

    //remove user
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("user remove successfully");
    }

    //get profile
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDto> getUserProfile() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Users user = userService.getUserByEmail(username);

        if(user == null) {
            return ResponseEntity.notFound().build();
        }

        UserResponseDto formatUser = new UserResponseDto();

        formatUser.setUsername(user.getUsername());
        formatUser.setEmail(user.getEmail());
        formatUser.setPosts(user.getPosts());
        formatUser.setRole(user.getRole());
        formatUser.setId(user.getId());
        formatUser.setBookmarks(user.getBookmarks());

        return ResponseEntity.ok(formatUser);
    }

    //Promote
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/promote/{id}")
    public ResponseEntity<String> promoteUser(@PathVariable Long id) {
        Users user = userService.getUserById(id);
        user.setRole(Role.ADMIN);

        userService.promoteUser(user);
        return ResponseEntity.ok("user promote to Admin successfully");
    }
}
