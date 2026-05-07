package com.ron.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestLoginDto {
    private String username;
    private String password;
}
