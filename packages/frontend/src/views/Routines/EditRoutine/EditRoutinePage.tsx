import { Box, Grid, Paper, styled, Typography } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useExercises } from '../../../hooks/useExercises';
import { useRoutine } from '../../../hooks/useRoutine';
import CenteredProgress from '../../common/CenteredProgress';
import { ErrorMessage } from '../../common/ErrorMessage';
import { ExerciseItem } from './ExerciseItem';

const GappedBox = styled(Box)({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const GreyPaper = styled(Paper)({
  padding: 16,
  backgroundColor: '#e6e6e6',
});

export function EditRoutinePage() {
  const { id } = useParams<{ id: string }>();
  const routineQuery = useRoutine(parseInt(id));
  const exercisesQuery = useExercises();

  if (routineQuery.isIdle || routineQuery.isLoading || exercisesQuery.isIdle || exercisesQuery.isLoading) {
    return <CenteredProgress />;
  }

  if (routineQuery.isError) {
    return <ErrorMessage message={routineQuery.error.message} />;
  }

  if (exercisesQuery.isError) {
    return <ErrorMessage message={exercisesQuery.error.message} />;
  }

  const routine = routineQuery.data;
  const addableExercises = exercisesQuery.data.filter((exercise) =>
    routine.exercises.every((routineExercise) => routineExercise.id !== exercise.id)
  );

  return (
    <GappedBox>
      <Typography variant="h5">{routine.name}</Typography>
      <GreyPaper>
        <Grid container direction="column" spacing={2}>
          {routine.exercises.map((exercise) => (
            <Grid item key={exercise.id}>
              <ExerciseItem exercise={exercise} />
            </Grid>
          ))}
        </Grid>
      </GreyPaper>
      <Box>
        <KeyboardArrowUpIcon fontSize="large" />
      </Box>
      <GreyPaper>
        <Grid container direction="column" spacing={2}>
          {addableExercises.map((exercise) => (
            <Grid item key={exercise.id}>
              <ExerciseItem exercise={exercise} />
            </Grid>
          ))}
        </Grid>
      </GreyPaper>
    </GappedBox>
  );
}
