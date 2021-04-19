import React from 'react';
import { useRecoilValue } from 'recoil';
import { Grid } from '@material-ui/core';

import Workout from './Workout';
import { dateState, getWorkoutsQuery } from '../states';
import { getDateString } from '../services';

function WorkoutList() {
  const date = useRecoilValue(dateState);
  const workouts = useRecoilValue(getWorkoutsQuery);
  
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