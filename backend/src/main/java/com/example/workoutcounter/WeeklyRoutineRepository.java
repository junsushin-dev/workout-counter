package com.example.workoutcounter;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WeeklyRoutineRepository extends CrudRepository<WeeklyRoutine, Integer> {
    List<WeeklyRoutine> findByDayOfWeek(Integer dayOfWeek);
}
