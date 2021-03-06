package com.example.workoutcounter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path="/api/workouts")
public class WorkoutController {
    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private RoutineRepository routineRepository;

    static private class GetWorkoutsResponse {
        public Iterable<Workout> workouts;
        public GetWorkoutsResponse(Iterable<Workout> workouts) {
            this.workouts = workouts;
        }
    }

    @GetMapping
    public @ResponseBody GetWorkoutsResponse getWorkouts(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Workout> workouts = workoutRepository.findByDate(date);
        if(!workouts.isEmpty()) return new GetWorkoutsResponse(workouts);

        // workout for given day is non-existent
        // make new workouts
        Integer dayOfWeek = date.getDayOfWeek().getValue();
        List<Routine> routines = routineRepository.findByDayOfWeek(dayOfWeek);
        workouts = routines.stream().map(routine -> new Workout(routine.getExercise(), date)).collect(Collectors.toList());
        workoutRepository.saveAll(workouts);
        return new GetWorkoutsResponse(workouts);
    }

    @PatchMapping
    public @ResponseBody Workout patchWorkout(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, @RequestParam String name, @RequestParam Integer done) {
        List<Workout> workouts = workoutRepository.findByDateAndExerciseName(date, name);
        Workout workout = workouts.get(0);
        workout.setDone(done);
        workoutRepository.save(workout);
        return workout;
    }
}
