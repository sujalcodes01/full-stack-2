package com.experiment.restapi.schedule;

import com.experiment.restapi.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {
    private final ScheduleService service;
    public ScheduleController(ScheduleService service) { this.service = service; }
    @GetMapping public ApiResponse<List<Schedule>> getAll() { return ApiResponse.success("Schedules retrieved", service.getAll()); }
    @GetMapping("/{id}") public ApiResponse<Schedule> getOne(@PathVariable Long id) { return ApiResponse.success("Schedule retrieved", service.getById(id)); }
    @PostMapping public ResponseEntity<ApiResponse<Schedule>> create(@Valid @RequestBody ScheduleRequest request) { return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Schedule created", service.create(request))); }
    @PutMapping("/{id}") public ApiResponse<Schedule> update(@PathVariable Long id, @Valid @RequestBody ScheduleRequest request) { return ApiResponse.success("Schedule updated", service.update(id, request)); }
    @DeleteMapping("/{id}") public ApiResponse<Void> delete(@PathVariable Long id) { service.delete(id); return ApiResponse.success("Schedule deleted", null); }
}
