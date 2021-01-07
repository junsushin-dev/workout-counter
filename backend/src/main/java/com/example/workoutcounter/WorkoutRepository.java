package com.example.workoutcounter;

import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkoutRepository extends  CrudRepository<Workout, Integer> {
    List<Workout> findByDate(LocalDate date);
}