package com.ron.backend.dto;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnalysisResponseDto {
    private LocalDateTime date;
    private String filename;

    @Column(columnDefinition = "TEXT")
    private String content;
}
