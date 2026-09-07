package com.experiment.restapi.schedule;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository {
    List<Schedule> findAll(); Optional<Schedule> findById(Long id); Schedule save(Schedule schedule); void deleteById(Long id);
}
