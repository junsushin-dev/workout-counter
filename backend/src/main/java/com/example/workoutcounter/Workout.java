package com.example.workoutcounter;

import org.apache.tomcat.jni.Local;

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
    @JoinColumn(name = "routine_id")
    private Routine routine;

    private Integer done;

    private LocalDate date;

    public Workout(Routine routine, LocalDate date) {
        this.routine = routine;
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

    public Routine getRoutine() {
        return routine;
    }

    public void setRoutine(Routine routine) {
        this.routine = routine;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

