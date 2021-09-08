import { Card, CardContent, styled, Typography } from '@material-ui/core';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { IExercise } from '../../../types';

const StyledCardContent = styled(CardContent)({
  padding: 8,
  '&:last-child': {
    paddingBottom: 8,
  },
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
});

interface ExerciseItemProps {
  exercise: IExercise;
  index: number;
}

export function ExerciseItem({ exercise, index }: ExerciseItemProps) {
  return (
    <Draggable key={exercise.id} draggableId={exercise.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <StyledCardContent>
            <Typography>{exercise.name}</Typography>
            <Typography>× {exercise.count}</Typography>
          </StyledCardContent>
        </Card>
      )}
    </Draggable>
  );
}
