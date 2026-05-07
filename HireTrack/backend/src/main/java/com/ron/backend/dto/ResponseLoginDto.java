package com.ron.backend.dto;

import com.ron.backend.entity.Analysis;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseLoginDto {
    private Long id;
    private String username;
    private List<String> roles;
    private List<Analysis> analyses;

    private LocalDateTime dateTime;
    private String bearerToken;
}
