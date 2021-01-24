import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Grid, Typography } from '@material-ui/core';
import DateNav from './DateNav';
import Workout from './Workout';
import { dateState, getWorkoutsQuery } from './states';
import { getDateString } from './services';

function Daily() {
  const titleText = "Today's Workout";
  const countOffset = 5;
  const [date] = useRecoilState(dateState);
  const workouts = useRecoilValue(getWorkoutsQuery);


  return (
    <Box display='flex' flexDirection='column'>
      <DateNav />
      <Typography>{titleText}</Typography>
      <Box p={2}>
        <Grid container spacing={2}>
          {workouts.map((workout) => (
            <Grid key={getDateString(date) + workout.exercise.name} item xs={12}>
              <Workout workout={workout} date={date} offset={countOffset}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Daily;