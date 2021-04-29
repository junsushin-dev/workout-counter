import { IExercise,IRoutine, IWorkout } from './types';

const MINUTE_MILLISECS = 60 * 1000;
const DAY_MILLISECS = 24 * 60 * MINUTE_MILLISECS;

export const getDateString = (date: Date):string => new Date(date.getTime() - date.getTimezoneOffset() * MINUTE_MILLISECS).toISOString().split('T')[0];

export const getTodayString = ():string => getDateString(new Date());

let workoutsCache = new Map();

const updateWorkoutsCache = async (date: Date):Promise<void> => {
  const dateString = getDateString(date);
  if(workoutsCache.has(dateString)) return;
  const workouts = await getWorkoutsByDateString(dateString);
  if(workouts === undefined || workouts === null) {
    return;
  }
  workoutsCache.set(dateString, workouts);
}

export const getWorkouts = async (date: Date):Promise<IWorkout[]> => {
  const dateString = getDateString(date);
  
  const cachedWorkouts = workoutsCache.get(dateString);
  if(cachedWorkouts !== undefined) return cachedWorkouts;

  await updateWorkoutsCache(date);
  updateWorkoutsCache(new Date(date.getTime() + DAY_MILLISECS));
  updateWorkoutsCache(new Date(date.getTime() - DAY_MILLISECS));

  return workoutsCache.get(dateString);
}

export const getWorkoutsByDateString = async (dateString: String): Promise<IWorkout[] | null> => {
  const res = await fetch(`/api/workouts?date=${dateString}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  if(res.status === 404) {
    return null;
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

  const dateString = getDateString(date);
  const cachedWorkouts = workoutsCache.get(dateString);
  const cachedIndex = cachedWorkouts.findIndex((workout: IWorkout) => workout.id === updatedWorkout.id);
  const updatedWorkouts = [...cachedWorkouts.slice(0, cachedIndex), updatedWorkout, ...cachedWorkouts.slice(cachedIndex + 1)];
  workoutsCache.set(dateString, updatedWorkouts);
  console.log(workoutsCache);
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

  const workout = await res.json();
  return workout;
}

export const createWorkoutsByRoutine = async (date: Date, routine: IRoutine): Promise<IWorkout[]> => {
  const dateString = getDateString(date);
  const workouts: IWorkout[] = await createWorkoutsByExercises(date, routine.exercises);
  workoutsCache.set(dateString, workouts);
  return workouts;
}