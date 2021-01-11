import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import DateNav from './DateNav';
import Workout from './Workout';

interface WorkoutResponse {
  id: number;
  exercise: {
    id: number;
    name: string;
    count: number;
  }
  done: number;
  date: string;
}

function Daily() {
  const titleText = "Today's Workout";
  const countOffset = 5;
  const [workouts, setWorkouts] = useState<WorkoutResponse[]>([]);

  useEffect(() => {
    (async (): Promise<void> => {
      const [dateString] = new Date().toISOString().split('T');
      const res = await fetch(`/api/workouts?date=${dateString}`, {
        headers: {
          "Accept": 'application/json',
        },
      });
      const data = await res.json();
      setWorkouts(data.workouts);
    })();
  }, []);

  return (
    <Box display='flex' flexDirection='column'>
      <DateNav />
      <Typography>{titleText}</Typography>
      <Box p={2}>
        <Grid container spacing={2}>
          {workouts.map(({ exercise }) => (
            <Grid key={exercise.name} item xs={12}>
              <Workout name={exercise.name} targetCount={exercise.count} offset={countOffset}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Daily;