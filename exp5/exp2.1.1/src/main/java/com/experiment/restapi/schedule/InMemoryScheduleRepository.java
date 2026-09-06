package com.experiment.restapi.schedule;

import org.springframework.stereotype.Repository;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class InMemoryScheduleRepository implements ScheduleRepository {
    private final ConcurrentHashMap<Long, Schedule> store = new ConcurrentHashMap<>();
    private final AtomicLong ids = new AtomicLong();
    public List<Schedule> findAll() { return store.values().stream().sorted(Comparator.comparing(Schedule::scheduledAt)).toList(); }
    public Optional<Schedule> findById(Long id) { return Optional.ofNullable(store.get(id)); }
    public Schedule save(Schedule schedule) {
        Long id = schedule.id() == null ? ids.incrementAndGet() : schedule.id();
        Schedule saved = new Schedule(id, schedule.title(), schedule.scheduledAt(), schedule.location()); store.put(id, saved); return saved;
    }
    public void deleteById(Long id) { store.remove(id); }
}
