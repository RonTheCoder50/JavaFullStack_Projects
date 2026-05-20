package com.ron.backend.dto;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AnalysisResponseDto {
    private Long id;
    private Long userId;
    private String filename;
    private LocalDateTime date;

    @Column(columnDefinition = "TEXT")
    private String content;
}
