import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Grid } from '@material-ui/core';

import Workout from './Workout';
import { dateState, getWorkoutsQuery } from '../states';
import { getDateString } from '../services';

function WorkoutList() {
  const [date] = useRecoilState(dateState);
  const workouts = useRecoilValue(getWorkoutsQuery);
  const countOffset = 5;
  
  return (
    <Grid container spacing={2}>
      {workouts.map((workout) => (
        <Grid key={getDateString(date) + workout.exercise.name} item xs={12}>
          <Workout workout={workout} date={date} offset={countOffset}/>
        </Grid>
      ))}
    </Grid>
  );
}

export default WorkoutList;