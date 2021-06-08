import { IExercise, IRoutine, IWorkout } from '../types';
import { customFetch } from '../utils/customFetch';
import { getDateString } from '../utils/getDateString';

export const getWorkouts = async (date: Date): Promise<IWorkout[]> => {
  const dateString = getDateString(date);

  const workouts = await customFetch(`/api/workouts?date=${dateString}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  return workouts;
};

export const updateDoneCount = async (id: number, date: Date, doneCount: number): Promise<void> => {
  const body = new URLSearchParams();
  body.set('count', doneCount.toString());

  const updatedWorkout = await customFetch(`/api/workouts/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
    },
    body,
  });

  return updatedWorkout;
};

export const getRoutines = async (): Promise<IRoutine[]> => {
  const routines = await customFetch('/api/routines');

  return routines;
};

const createWorkoutsByExercises = async (date: Date, exercises: IExercise[]): Promise<IWorkout[]> => {
  const dateString = getDateString(date);

  const workouts = await customFetch('/api/workouts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
