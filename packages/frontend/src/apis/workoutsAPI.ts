import { IExercise, IRoutine, IWorkout } from '../types';
import { customFetch } from '../utils/customFetch';
import { getDateString } from '../utils/getDateString';

export const getWorkouts = async (date: Date): Promise<IWorkout[]> => {
  const dateString = getDateString(date);

  const workouts = await customFetch(`/api/workouts?date=${dateString}`);

  return workouts;
};

export const updateDoneCount = async (id: number, doneCount: number): Promise<void> => {
  const updatedWorkout = await customFetch(`/api/workouts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      count: doneCount,
    }),
  });

  return updatedWorkout;
};

const createWorkoutsByExercises = async (date: Date, exercises: IExercise[]): Promise<IWorkout[]> => {
  const dateString = getDateString(date);

  const workouts = await customFetch('/api/workouts', {
    method: 'POST',
    body: JSON.stringify({
      date: dateString,
      exerciseIds: exercises.map((exercise) => exercise.id),
    }),
  });

  return workouts;
};

export const createWorkoutsByRoutine = async (date: Date, routine: IRoutine): Promise<IWorkout[]> => {
  const workouts: IWorkout[] = await createWorkoutsByExercises(date, routine.exercises);
  return workouts;
};

export const deleteWorkouts = async (date: Date) => {
  const dateString = getDateString(date);

  await customFetch(`/api/workouts?date=${dateString}`, {
    method: 'DELETE',
  });
};
