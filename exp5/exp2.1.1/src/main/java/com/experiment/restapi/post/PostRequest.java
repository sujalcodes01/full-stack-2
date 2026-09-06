package com.experiment.restapi.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostRequest(
        @NotBlank(message = "Title is required") @Size(max = 100, message = "Title must not exceed 100 characters") String title,
        @NotBlank(message = "Content is required") @Size(max = 2000, message = "Content must not exceed 2000 characters") String content,
        @NotBlank(message = "Author is required") @Size(max = 60, message = "Author must not exceed 60 characters") String author) { }
