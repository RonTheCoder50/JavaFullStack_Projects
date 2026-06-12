package com.ron.backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserDataResponseDto {
    private String plan;
    private Long limit;
    private Long totalAnalysis;
    private Integer totalJobMatchAnalyses;
    private Double avgAtsScore;

    private List<HistoryResponseDto> analysisHistory;
    private Boolean isBlock;
}
