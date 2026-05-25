package com.ron.backend.model;

import lombok.Setter;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnalysesTableDto {
    private String username;
    private String filename;
    private LocalDateTime time;
    private Integer ats;
    private Long uid; //user id
}
