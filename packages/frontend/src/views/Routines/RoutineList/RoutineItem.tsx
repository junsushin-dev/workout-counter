import { Card, CardActionArea, CardContent, styled, Typography } from '@material-ui/core';
import React from 'react';

import { IRoutine } from '../../../types';
import ExerciseItem from './ExerciseItem';

const TextAlignLeftCardContent = styled(CardContent)({
  textAlign: 'left',
});

interface IProps {
  routine: IRoutine;
  onClick: React.MouseEventHandler<HTMLElement>;
}

function RoutineItem({ routine, onClick }: IProps) {
  const { name, exercises } = routine;

  return (
    <Card elevation={2} onClick={onClick}>
      <CardActionArea>
        <TextAlignLeftCardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            {name}
          </Typography>
          {exercises.map((exercise) => (
            <ExerciseItem key={exercise.id} exercise={exercise} />
          ))}
        </TextAlignLeftCardContent>
      </CardActionArea>
    </Card>
  );
}

export default RoutineItem;
