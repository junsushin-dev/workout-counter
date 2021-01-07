package com.example.workoutcounter;

import javax.persistence.*;

@Entity
public class WeeklyRoutine {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    //    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    @ManyToOne
    @JoinColumn(name = "routine_id")
    private Routine routine;

    private Integer dayOfWeek;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Routine getRoutine() {
        return routine;
    }

    public void setRoutine(Routine routine) {
        this.routine = routine;
    }

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}
