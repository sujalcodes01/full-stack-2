package com.example.observability.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(
        @NotBlank(message = "name must not be blank") String name,
        @Email(message = "email must be valid") @NotBlank(message = "email must not be blank") String email) {
}
