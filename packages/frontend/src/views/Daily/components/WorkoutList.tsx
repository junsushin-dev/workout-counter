import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { deleteWorkouts } from '../../../apis/workoutsAPI';
import { useWorkouts } from '../../../hooks/useWorkouts';
import { getDateString } from '../../../utils/getDateString';
import CenteredProgress from '../../common/CenteredProgress';
import { ErrorMessage } from '../../common/ErrorMessage';
import { dateState } from '../states';
import Workout from './Workout';

function WorkoutList() {
  const date = useRecoilValue(dateState);
  const workoutQuery = useWorkouts();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteWorkouts, {
    onSuccess: () => {
      queryClient.invalidateQueries(`workouts/${getDateString(date)}`);
    },
  });

  if (workoutQuery.isIdle || workoutQuery.isLoading || workoutQuery.isFetching || mutation.isLoading) {
    return <CenteredProgress />;
  }

  if (workoutQuery.isError) {
    return <ErrorMessage message={workoutQuery.error.message} />;
  }

  if (mutation.isError && mutation.error instanceof Error) {
    return <ErrorMessage message={mutation.error.message} />;
  }

  const workouts = workoutQuery.data;

  const handleResetWorkout = () => {
    const workoutIds = workouts.map((workout) => workout.id);
    mutation.mutate(workoutIds);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <div style={{ flex: 1, width: '100%' }}>
        <Grid container spacing={2}>
          {workouts.map((workout) => (
            <Grid key={getDateString(date) + workout.exercise_name} item xs={12}>
              <Workout workout={workout} date={date} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Box display="flex" justifyContent="space-around">
        <Button variant="contained" color="primary" onClick={handleResetWorkout}>
          Reset Workout
        </Button>
      </Box>
    </Box>
  );
}

export default WorkoutList;
