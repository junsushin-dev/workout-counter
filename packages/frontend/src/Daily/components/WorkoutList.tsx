import { Grid } from '@material-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { useWorkouts } from '../hooks/useWorkouts';
import { getDateString } from '../services';
import { dateState } from '../states';
import Workout from './Workout';

function WorkoutList() {
  const date = useRecoilValue(dateState);
  const workoutQuery = useWorkouts();
  
  if (workoutQuery.isIdle || workoutQuery.isLoading) {
    return <span>loading...</span>;
  }

  if (workoutQuery.isError) {
    return <span>{workoutQuery.error}</span>
  }

  const workouts = workoutQuery.data;

  return (
    <Grid container spacing={2}>
      {workouts.map((workout) => (
        <Grid key={getDateString(date) + workout.exercise.name} item xs={12}>
          <Workout workout={workout} date={date}/>
        </Grid>
      ))}
    </Grid>
  );
}

export default WorkoutList;