import { AddExerciseDTO, IExercise } from '../types';
import { customFetch } from '../utils/customFetch';

export const getExercises = async () => {
  const exercises = await customFetch('/api/exercises');

  return exercises;
};

export const addExercise = async (exercise: AddExerciseDTO) => {
  const addedExercise = await customFetch('/api/exercises', {
    method: 'POST',
    body: JSON.stringify(exercise),
  });

  return addedExercise;
};

export const editExercise = async ({ id, name, count }: IExercise) => {
  const editedExercise = await customFetch(`/api/exercises/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      count,
    }),
  });

  return editedExercise;
};

export const deleteExercises = async (exerciseIds: (string | number)[]) => {
  exerciseIds.map((id) =>
    customFetch(`/api/exercises/${id}`, {
      method: 'DELETE',
    })
  );
};
