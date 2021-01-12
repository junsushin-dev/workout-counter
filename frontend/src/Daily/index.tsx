import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import DateNav from './DateNav';
import Workout from './Workout';
import { IWorkout, getTodayWorkouts } from './services';

function Daily() {
  const titleText = "Today's Workout";
  const countOffset = 5;
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  useEffect(() => {
    (async (): Promise<void> => {
      const workouts = await getTodayWorkouts();
      setWorkouts(workouts);
    })();
  }, []);

  return (
    <Box display='flex' flexDirection='column'>
      <DateNav />
      <Typography>{titleText}</Typography>
      <Box p={2}>
        <Grid container spacing={2}>
          {workouts.map((workout) => (
            <Grid key={workout.exercise.name} item xs={12}>
              <Workout workout={workout} offset={countOffset}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Daily;