import React from 'react';
import { Card, CardContent, Typography, styled } from '@material-ui/core'
import { IRoutine } from '../types';
import ExerciseItem from './ExerciseItem';

const TextAlignLeftCardContent = styled(CardContent)({
  textAlign: 'left',
});

interface IProps {
  routine: IRoutine;
}

function RoutineItem(props: IProps) {
  const { name, exercises } = props.routine;
  
  return (
    <Card elevation={2} >
      <TextAlignLeftCardContent>
        <Typography variant='h5' component='h3' gutterBottom>{name}</Typography>
        {exercises.map(exercise => 
          <ExerciseItem key={exercise.id} exercise={exercise}/>
        )}
      </TextAlignLeftCardContent>
    </Card>
  );
}

export default RoutineItem;
