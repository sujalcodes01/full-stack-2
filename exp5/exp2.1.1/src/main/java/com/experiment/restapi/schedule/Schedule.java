package com.experiment.restapi.schedule;

import java.time.LocalDateTime;

public record Schedule(Long id, String title, LocalDateTime scheduledAt, String location) { }
