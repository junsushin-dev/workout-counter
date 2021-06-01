import { Box, Button, InputAdornment, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { addExercise } from '../../apis/exercisesAPI';
import { AddExerciseDTO } from '../../types';
import { StyledTextField } from './styled';

export function ExercisesForm() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data: AddExerciseDTO) => {
    try {
      await addExercise(data);
      history.push('/exercises');
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Box display='flex' flexDirection='column' height='100%' padding={4}>
      <Box paddingBottom={4}>
        <Typography variant="h5" component="h1">CREATE A NEW EXERCISE</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField {...register("name")} label="Exercise Name" variant="filled" />
        <StyledTextField {...register("count")} label="Count" type="number" variant="filled" />
        <StyledTextField 
          {...register("weight")}
          label="Weight" 
          type="number" 
          variant="filled"
          InputProps={{
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }} />
        <Box display="flex" justifyContent="space-around">
          <Button type="submit" variant='contained' color='primary'>Confirm</Button>
          <Button variant='contained' color='primary'>Cancel</Button>
        </Box>
      </form>
    </Box>
  )
}
