import { Box, Grid, Paper, styled, Typography } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
    <DragDropContext onDragEnd={() => {}}>
      <GappedBox>
        <Typography variant="h5">{routine.name}</Typography>
        <Droppable droppableId="included">
          {(provided, snapshot) => (
            <GreyPaper {...provided.droppableProps} ref={provided.innerRef}>
              <Grid container direction="column" spacing={2}>
                {routine.exercises.map((exercise, index) => (
                  <Grid item key={exercise.id}>
                    <ExerciseItem exercise={exercise} index={index} />
                  </Grid>
                ))}
                {provided.placeholder}
              </Grid>
            </GreyPaper>
          )}
        </Droppable>
        <Box>
          <KeyboardArrowUpIcon fontSize="large" />
        </Box>
        <Droppable droppableId="excluded">
          {(provided, snapshot) => (
            <GreyPaper {...provided.droppableProps} ref={provided.innerRef}>
              <Grid container direction="column" spacing={2}>
                {addableExercises.map((exercise, index) => (
                  <Grid item key={exercise.id}>
                    <ExerciseItem exercise={exercise} index={index} />
                  </Grid>
                ))}
                {provided.placeholder}
              </Grid>
            </GreyPaper>
          )}
        </Droppable>
      </GappedBox>
    </DragDropContext>
  );
}
