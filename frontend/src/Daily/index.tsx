import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import DateNav from './DateNav';
import Workout from './Workout';

function Daily() {
  const titleText = "Today's Workout";
  const countOffset = 5;

  const workouts = [
    {
      name: 'PullUps',
      targetCount: 50,
    },
    {
      name: 'PushUps',
      targetCount: 100,
    },
  ]

  return (
    <Box display='flex' flexDirection='column'>
      <DateNav />
      <Typography>{titleText}</Typography>
      <Box p={2}>
        <Grid container spacing={2}>
          {workouts.map(({ name, targetCount }) => (
            <Grid key={name} item xs={12}>
              <Workout name={name} targetCount={targetCount} offset={countOffset}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Daily;