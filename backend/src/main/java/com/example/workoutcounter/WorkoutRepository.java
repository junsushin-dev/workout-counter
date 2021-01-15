package com.example.workoutcounter;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkoutRepository extends  CrudRepository<Workout, Integer> {
    List<Workout> findByDate(LocalDate date);
    @Query("SELECT w,e FROM Workout w JOIN w.exercise e WHERE w.date = ?1 AND e.name = ?2")
    List<Workout> findByDateAndExerciseName(LocalDate date, String name);
}