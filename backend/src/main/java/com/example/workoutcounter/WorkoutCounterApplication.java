package com.example.workoutcounter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class WorkoutCounterApplication {
	public static void main (String[] args) {
		SpringApplication.run(WorkoutCounterApplication.class, args);
	}
}