package com.ron.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestLoginDto {
    @NotBlank(message = "Username is Required!")
    private String username;

    @Size(min =  6, message = "Password must be 6+ chars")
    private String password;
}
