import { Card, CardContent, styled, Typography } from '@material-ui/core';
import React from 'react';

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
}

export function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <Card>
      <StyledCardContent>
        <Typography>{exercise.name}</Typography>
        <Typography>× {exercise.count}</Typography>
      </StyledCardContent>
    </Card>
  );
}
