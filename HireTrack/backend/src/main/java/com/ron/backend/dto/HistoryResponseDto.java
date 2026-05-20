package com.ron.backend.dto;

import lombok.*;
import java.time.LocalDate;

@Setter
@Getter
public class HistoryResponseDto {
    private LocalDate date;
    private String fileName;
    private Integer avgAtsScore;
}
