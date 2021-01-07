package com.example.workoutcounter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path="/api/workout")
public class WorkoutController {
    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private RoutineRepository routineRepository;

    @Autowired
    private WeeklyRoutineRepository weeklyRoutineRepository;

    @GetMapping
    public @ResponseBody Iterable<Workout> getWorkouts(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Workout> workouts = workoutRepository.findByDate(date);
        if(!workouts.isEmpty()) return workouts;

        // workout for given day is non-existent
        // make new workouts
        Integer dayOfWeek = date.getDayOfWeek().getValue();
        List<WeeklyRoutine> weeklyRoutines = weeklyRoutineRepository.findByDayOfWeek(dayOfWeek);
        workouts = weeklyRoutines.stream().map(weeklyRoutine -> new Workout(weeklyRoutine.getRoutine(), date)).collect(Collectors.toList());
        workoutRepository.saveAll(workouts);
        return workouts;
    }
}
