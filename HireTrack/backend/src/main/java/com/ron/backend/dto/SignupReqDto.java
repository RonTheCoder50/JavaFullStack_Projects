package com.ron.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupReqDto {
    @NotBlank(message = "Username is Required!")
    @Size(min = 5, message = "Username must be 5+ chars")
    private String username;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required!")
    private String email;

    @Size(min = 6, message = "Password must be 6+ chars")
    @NotBlank(message = "Password required!")
    private String password;
}
