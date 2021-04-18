import React from 'react';
import { useRecoilValue } from 'recoil';
import { Card, CardContent, Typography, styled } from '@material-ui/core'
import { dateState } from '../states';
import { IRoutine } from '../types';
import ExerciseItem from './ExerciseItem';
import { createWorkoutsByRoutine } from '../services';

const TextAlignLeftCardContent = styled(CardContent)({
  textAlign: 'left',
});

interface IProps {
  routine: IRoutine;
}

function RoutineItem({ routine }: IProps) {
  const date = useRecoilValue(dateState);
  const { name, exercises } = routine;

  const handleClick = async () => {
    await createWorkoutsByRoutine(date, routine);
  }

  return (
    <Card elevation={2} onClick={handleClick}>
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
