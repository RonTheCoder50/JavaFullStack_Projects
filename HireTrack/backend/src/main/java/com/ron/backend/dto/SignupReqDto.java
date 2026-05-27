package com.ron.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupReqDto {
    @NotBlank(message = "Username is Required!")
    private String username;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required!")
    private String email;

    @Size(min = 6, message = "Password must be 6+ chars")
    private String password;
}
