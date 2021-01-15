package com.example.workoutcounter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Workout {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    private Integer done;

    private LocalDate date;

    public Workout() {}

    public Workout(Exercise exercise, LocalDate date) {
        this.exercise = exercise;
        this.date = date;
        this.done = 0;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDone() {
        return done;
    }

    public void setDone(Integer done) {
        this.done = done;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

