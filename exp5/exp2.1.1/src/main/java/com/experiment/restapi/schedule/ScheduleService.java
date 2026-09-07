package com.experiment.restapi.schedule;

import com.experiment.restapi.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ScheduleService {
    private final ScheduleRepository repository;
    public ScheduleService(ScheduleRepository repository) { this.repository = repository; }
    public List<Schedule> getAll() { return repository.findAll(); }
    public Schedule getById(Long id) { return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Schedule " + id + " was not found")); }
    public Schedule create(ScheduleRequest r) { return repository.save(new Schedule(null, r.title(), r.scheduledAt(), r.location())); }
    public Schedule update(Long id, ScheduleRequest r) { getById(id); return repository.save(new Schedule(id, r.title(), r.scheduledAt(), r.location())); }
    public void delete(Long id) { getById(id); repository.deleteById(id); }
}
