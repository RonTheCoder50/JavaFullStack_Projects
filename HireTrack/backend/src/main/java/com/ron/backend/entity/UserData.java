package com.ron.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_data")
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; //pk

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Users user;

    private String plan;
    private Long remainingLimit;
    private LocalDate lastResetDate;

    private Long totalAnalysis;
    private Double avgAtsScore; //last 5 resume avg score based on recent dates!
}
