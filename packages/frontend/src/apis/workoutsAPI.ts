import { IExercise, IRoutine, IWorkout } from '../types';
import { getDateString } from '../utils/getDateString';

export const getWorkouts = async (date: Date):Promise<IWorkout[]> => {
  const dateString = getDateString(date);
  
  const res = await fetch(`/api/workouts?date=${dateString}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  if(res.status === 404) {
    return [];
  }
  const workouts = await res.json();
  return workouts;
}

export const updateDoneCount = async (id: number, date: Date, doneCount: number):Promise<void> => {
  const body = new URLSearchParams();
  body.set('count', doneCount.toString());
  const res = await fetch(`/api/workouts/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json'
    },
    body,
  });
  const updatedWorkout = await res.json();
  return updatedWorkout;
}

export const getRoutines = async ():Promise<IRoutine[]> => {
  const res = await fetch('/api/routines');
  return await res.json();
}

const createWorkoutsByExercises = async (date: Date, exercises: IExercise[]): Promise<IWorkout[]> => {
  const dateString = getDateString(date);

  const res = await fetch('/api/workouts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: dateString,
      exerciseIds: exercises.map((exercise) => exercise.id),
    }),
  })

  const workouts = await res.json();
  return workouts;
}

export const createWorkoutsByRoutine = async (date: Date, routine: IRoutine): Promise<IWorkout[]> => {
  const workouts: IWorkout[] = await createWorkoutsByExercises(date, routine.exercises);
  return workouts;
}