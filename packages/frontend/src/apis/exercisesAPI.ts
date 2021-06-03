import { AddExerciseDTO } from '../types';
import { customFetch } from '../utils/customFetch';

export const getExercises = async () => {
  const exercises = await customFetch('/api/exercises');

  return exercises;
};

export const addExercise = async (exercise: AddExerciseDTO) => {
  const addedExercise = await customFetch('/api/exercises', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise),
  });

  return addedExercise;
};
