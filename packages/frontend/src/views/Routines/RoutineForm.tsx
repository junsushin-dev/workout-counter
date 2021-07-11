import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { addRoutine } from '../../apis/routinesAPI';
import { AddExerciseDTO } from '../../types';
import { StyledTextField } from '../Exercises/styled';

export function RoutineForm() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: AddExerciseDTO) => {
    try {
      const addedRoutine = await addRoutine(data);
      history.push(`/routines/${addedRoutine.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    history.push('/routines');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField {...register('name')} label="Routine Name" variant="filled" />
      <Box display="flex" justifyContent="space-around">
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
        <Button onClick={onCancel} variant="contained" color="secondary">
          Cancel
        </Button>
      </Box>
    </form>
  );
}
