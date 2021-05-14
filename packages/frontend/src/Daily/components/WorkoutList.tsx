import { Grid } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { getDateString, getWorkouts } from '../services';
import { dateState } from '../states';
import { IWorkout } from '../types';
import Workout from './Workout';

function WorkoutList() {
  const date = useRecoilValue(dateState);
  const workoutQuery = useQuery<IWorkout[], Error>(`workouts/${getDateString(date)}`, () => getWorkouts(date));
  
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