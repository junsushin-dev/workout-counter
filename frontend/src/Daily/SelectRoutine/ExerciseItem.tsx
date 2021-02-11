import React from 'react';
import { Box, Typography } from '@material-ui/core'
import { IExercise } from '../types';

interface IProps {
  exercise: IExercise;
}

function ExerciseItem(props: IProps) {
  const { name, count } = props.exercise;
  
  return (
    <Box display='flex' flexDirection='row' justifyContent='space-between'>
      <Typography>{name}</Typography>
      <Typography>× {count}</Typography>
    </Box>
  );
}

export default ExerciseItem;
