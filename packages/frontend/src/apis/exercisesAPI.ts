import { AddExerciseDTO, IExercise } from '../types';
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

export const editExercise = async ({ id, name, count }: IExercise) => {
  const editedExercise = await customFetch(`/api/exercises/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      count,
    }),
  });

  return editedExercise;
};
