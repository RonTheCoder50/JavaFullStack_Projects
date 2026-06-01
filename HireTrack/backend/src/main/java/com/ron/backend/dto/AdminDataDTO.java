package com.ron.backend.dto;

import com.ron.backend.model.AnalysesTableDto;
import com.ron.backend.model.ChartDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDataDTO {
    private String username;

    private Long totalUsers;
    private Long totalAnalyses;
    private Integer todayAnalyses;
    private Double avgAtsScore;

    List<ChartDto> planData;
    List<AnalysesTableDto> analysesDataList;
}
