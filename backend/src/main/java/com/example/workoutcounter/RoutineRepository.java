package com.example.workoutcounter;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RoutineRepository extends CrudRepository<Routine, Integer> {
}
