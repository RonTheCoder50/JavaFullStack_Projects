package com.ron.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private LocalDate dateOfJoining;

    private List<String> roles;
    public void addRole(String role){
        roles.add(role);
    }

    @OneToMany(mappedBy = "user")
    private List<Analysis> analyses;
}
