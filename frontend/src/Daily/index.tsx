import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Grid, Typography } from '@material-ui/core';
import DateNav from './DateNav';
import Workout from './Workout';
import { dateState } from './states';
import { IWorkout, getWorkouts } from './services';

function Daily() {
  const titleText = "Today's Workout";
  const countOffset = 5;
  const [date] = useRecoilState(dateState);
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  useEffect(() => {
    (async (): Promise<void> => {
      const workouts = await getWorkouts(date);
      setWorkouts(workouts);
    })();
  }, [date]);

  return (
    <Box display='flex' flexDirection='column'>
      <DateNav />
      <Typography>{titleText}</Typography>
      <Box p={2}>
        <Grid container spacing={2}>
          {workouts.map((workout) => (
            <Grid key={workout.exercise.name} item xs={12}>
              <Workout workout={workout} date={date} offset={countOffset}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Daily;