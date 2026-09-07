package com.experiment.restapi.schedule;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record ScheduleRequest(
        @NotBlank(message = "Title is required") @Size(max = 100, message = "Title must not exceed 100 characters") String title,
        @NotNull(message = "Scheduled time is required") @FutureOrPresent(message = "Scheduled time must be now or in the future") LocalDateTime scheduledAt,
        @NotBlank(message = "Location is required") @Size(max = 150, message = "Location must not exceed 150 characters") String location) { }
