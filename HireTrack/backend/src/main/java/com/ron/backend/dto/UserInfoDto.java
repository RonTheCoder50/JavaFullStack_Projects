package com.ron.backend.dto;

// note -> this dto is made specially for admin panel to analyze and control each user!

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class UserInfoDto {
    private Long userId;
    private String username;

    private String plan;
    private LocalDate dateOfJoining;

    private Double avgAtsScore;
    private Long totalAnalyses;

    private Boolean isBlock;
    private List<String> roles;
}
