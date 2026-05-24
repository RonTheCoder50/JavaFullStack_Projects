package com.ron.backend.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChartDto {
    private String label;
    private Long value;
}
