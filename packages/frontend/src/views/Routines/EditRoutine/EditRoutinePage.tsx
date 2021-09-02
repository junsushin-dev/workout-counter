import { Box, Grid, Paper, styled, Typography } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { useExercises } from '../../../hooks/useExercises';
import { useRoutine } from '../../../hooks/useRoutine';
import { IExercise, IRoutine } from '../../../types';
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
  const queryClient = useQueryClient();

  // TODO: Change fetcher to API call
  const updateRoutineExercisesMutation = useMutation((newExercises) => Promise.resolve(newExercises), {
    onMutate: async (newExercises: IExercise[]) => {
      const previousRoutine = queryClient.getQueryData<IRoutine>(`routines/${id}`);
      if (previousRoutine) {
        queryClient.setQueryData<IRoutine>(`routines/${id}`, {
          ...previousRoutine,
          exercises: newExercises,
        });
      }

      return { previousRoutine };
    },
  });

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

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = source.droppableId === 'included' ? routine.exercises : addableExercises;
    const finish = destination.droppableId === 'included' ? routine.exercises : addableExercises;

    // move item inside column
    if (start === finish) {
      if (source.droppableId === 'excluded') return;
      const newExercises = [...start];
      const moved = newExercises.find((item) => item.id.toString() === draggableId);
      if (!moved) return;
      newExercises.splice(source.index, 1);
      newExercises.splice(destination.index, 0, moved);
      updateRoutineExercisesMutation.mutate(newExercises);
      return;
    }

    // move item between columns
    const newStartColumn = [...start];
    const newFinishColumn = [...finish];
    const moved = newStartColumn.find((item) => item.id.toString() === draggableId);
    if (!moved) return;
    newStartColumn.splice(source.index, 1);
    newFinishColumn.splice(destination.index, 0, moved);
    const newExercises = source.droppableId === 'included' ? newStartColumn : newFinishColumn;
    updateRoutineExercisesMutation.mutate(newExercises);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
